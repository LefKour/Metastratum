import { ReactNode } from 'react';

// Overlay Content
const overlayContent: any = {
  "/": <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec magna cursus, ultricies mauris vitae, tincidunt neque. Morbi iaculis libero ac dignissim faucibus. Sed nec aliquet justo, id auctor mi. Aenean cursus lectus id tellus faucibus, et sodales lacus iaculis. Donec ultrices a ante at efficitur. Etiam consectetur bibendum nisi, in imperdiet ex dignissim convallis. Sed eu nulla vel sapien ornare eleifend.
    Etiam non nunc pharetra lorem accumsan vulputate. Vivamus consectetur, purus at pulvinar venenatis, dui nisi interdum libero, vel faucibus leo felis egestas urna. Donec et massa ante. Donec nec pretium nibh. Ut eget convallis dolor. Integer eu ex ut dolor luctus accumsan vel sed sem. In sit amet gravida ex, ut consectetur ligula. Donec blandit sem quis nisl tempor, eget tristique nunc volutpat. Suspendisse sollicitudin lorem id ipsum venenatis scelerisque.
    Fusce semper, sem nec vulputate egestas, libero sem suscipit nibh, sit amet rhoncus turpis ipsum sit amet lacus. Vestibulum vitae pharetra ligula. Maecenas ante diam, tincidunt et felis vitae, auctor facilisis ante. Etiam euismod cursus turpis. Aenean felis quam, accumsan eget diam at, consequat pulvinar arcu. Duis porta, justo sit amet accumsan condimentum, nunc nisl mattis risus, at aliquet turpis enim porta dui. Donec vitae pellentesque sem, eu pulvinar eros.
    Morbi facilisis tellus sit amet maximus molestie. Morbi leo dolor, eleifend vitae tortor at, mollis vestibulum ex. Etiam volutpat nibh quis tortor porta auctor. Maecenas eu dolor lobortis, semper quam ut, lacinia ante. Praesent dignissim dignissim justo, et tempus leo faucibus eget. Nulla leo diam, tristique eu leo vel, posuere luctus magna. </p>,
  "/map_selection": <p>Map</p>
};

const closableStates: any = {
    "/": true,
    "/map_selection": false
};

// Functions
export const getOverlayContent = (pathName: string): ReactNode => {
  return pathName in overlayContent ? overlayContent[pathName] : "";
};

export const getOverlayClosableState = (pathName: string): boolean => {
  return pathName in closableStates ? closableStates[pathName] : false;
};