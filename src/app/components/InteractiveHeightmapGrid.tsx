'use client'
import {useEffect, useRef} from 'react';
import * as THREE from 'three';

const vertexShader = `
    varying vec2 vUv;
            
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uResolution;
            uniform float uCircleSize;
            uniform float uCircleSpacing;
            uniform float uAnimSpeed;
            uniform float uThreshold;
            uniform vec2 uMouse;
            uniform float uMouseInfluence;
            
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                    0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                    -0.577350269189626,  // -1.0 + 2.0 * C.x
                                    0.024390243902439); // 1.0 / 41.0
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }
            
            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;

                for(int i = 0; i < 20; i++) {
                    value += amplitude * snoise(p * frequency);
                    frequency *= 2.0;
                    amplitude *= 0.5;
                }

                return value;
            }

            float ridgeNoise(vec2 p) {
                float n = abs(snoise(p));
                n = 1.0 - n;
                n = n * n;
                return n;
            }

            float ridgeFbm(vec2 p, float timeOffset) {
                float value = 0.0;
                float amplitude = 1.0;
                float frequency = 1.0;
                float weight = 1.0;

                for(int i = 0; i < 5; i++) {
                    vec2 timeVarying = p * frequency + vec2(
                        snoise(vec2(timeOffset * 3.0 + float(i) * 10.0, 0.0)) * 0.3,
                        snoise(vec2(0.0, timeOffset * 3.0 + float(i) * 10.0)) * 0.3
                    );

                    float n = ridgeNoise(timeVarying);
                    n *= weight;
                    weight = n;

                    value += n * amplitude;
                    frequency *= 2.2;
                    amplitude *= 0.5;
                }

                return value;
            }

            void main() {
                vec2 uv = vUv;

                vec2 gridUV = uv * uResolution / uCircleSpacing;
                vec2 gridCell = floor(gridUV);
                vec2 cellUV = fract(gridUV);

                float aspect = uResolution.x / uResolution.y;

                vec2 noiseCoord = gridCell * 0.1;
                noiseCoord.x /= aspect;
                noiseCoord.x *= 0.5; 
                noiseCoord.y *= 0.25; 

                float timeOffset = uTime * uAnimSpeed;

                noiseCoord.x += timeOffset * 2.0;

                float height = ridgeFbm(noiseCoord, timeOffset);

                height = pow(height, 2.0);
                height = smoothstep(0.2, 0.95, height);

                vec2 mouseDistance = uv - uMouse;
                mouseDistance.x *= aspect;
                float distToMouse = length(mouseDistance);

                float brushRadius = 0.5;
                float falloffStart = 0.05;
                float mouseEffect = uMouseInfluence * (1.0 - smoothstep(falloffStart, brushRadius, distToMouse));

                height = clamp(height + mouseEffect * 0.8, 0.0, 1.0);

                if (height < uThreshold) {
                    discard;
                }

                vec2 centerOffset = cellUV - vec2(0.5);
                float dist = length(centerOffset);

                float radius = uCircleSize * height;

                float circle = 1.0 - smoothstep(radius - 0.02, radius + 0.02, dist);

                if (circle < 0.01) {
                    discard;
                }

                vec3 color = vec3(height);

                vec2 vignetteUV = vUv * 2.0 - 1.0; // Convert to -1 to 1 range
                float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3;
                vignette = smoothstep(0.0, 1.0, vignette);

                float fadeX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
                float fadeY = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
                float edgeFade = fadeX * fadeY;

                gl_FragColor = vec4(color * circle * vignette, edgeFade);
            }
`;

const InteractiveHeightmapGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime: { value: 0.0 },
            uResolution: { value: new THREE.Vector2(width, height) },
            uCircleSize: { value: 0.125 },
            uCircleSpacing: { value: 15.0 },
            uAnimSpeed: { value: 0.01 },
            uThreshold: { value: 0.5 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uMouseInfluence: { value: 1 }
        },
        side: THREE.DoubleSide,
        transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2 * aspect, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        const newAspect = newWidth / newHeight;

        camera.left = -newAspect;
        camera.right = newAspect;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
        material.uniforms.uResolution?.value.set(newWidth, newHeight);

        quad.scale.x = newAspect;
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - ((e.clientY - rect.top) / rect.height);
        material.uniforms.uMouse?.value.set(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            const x = (touch!.clientX - rect.left) / rect.width;
            const y = 1.0 - ((touch!.clientY - rect.top) / rect.height);
            material.uniforms.uMouse?.value.set(x, y);
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let animationFrameId: number;
    function animate(time: number) {
        animationFrameId = requestAnimationFrame(animate);

        material.uniforms.uTime!.value = time * 0.001;

        renderer.render(scene, camera);
    }

    animate(0);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);

        geometry.dispose();
        material.dispose();
        renderer.dispose();

        if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
        }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-2/3 absolute top-1/2 left-0 -translate-y-1/2" />
  );
};

export default InteractiveHeightmapGrid;