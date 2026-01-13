'use client';
import { useAppStore } from '@/stores/store';
import { usePathname } from 'next/navigation'
import { useEffect, useRef, ReactNode } from 'react';
import GenericContainer from '@/app/(containers)/GenericContainer';
import {getOverlayContent, getOverlayClosableState} from '@/lib/utils/OverlayUtils';

interface OverlayProps {
}

const Overlay = ({}: OverlayProps) => {
  const store = useAppStore();
  const path = usePathname();

  const overlayContent = useRef<ReactNode | null>(null);
  const closableState = useRef<boolean>(true);

  // Handle Page Change
  useEffect(() => {
    overlayContent.current = getOverlayContent(path);
    closableState.current = getOverlayClosableState(path);
  }, [path]);

  return (<div
    className={`absolute top-0 w-full h-full bg-black/30 backdrop-blur-sm block flex justify-center items-center
    ${store.isOverlayEnabled ? 'visible' : 'invisible'}`}>
    <GenericContainer title={"Metastratum"} isClosable={closableState.current}>
      {overlayContent.current ?? "None"}
    </GenericContainer>
  </div>);
}

export default Overlay;