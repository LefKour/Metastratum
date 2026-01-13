'use client';
import {X} from 'lucide-react';
import { useAppStore } from '@/stores/store';

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return (
    <button
      className="px-2 py-2 rounded-xl border border-gray-300 bg-linear-135 from-gray-300/50
      to-black/50 hover:cursor-pointer hover:outline hover:outline-2 hover:outline-white hover:outline-offset-0
      transition duration-150 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface GenericContainerProps {
  isClosable?: boolean;
  title: string | null;
  children: React.ReactNode;
}

const GenericContainer = ({isClosable = true, title, children}: GenericContainerProps) => {
  const store = useAppStore();

  return (
    <div className="p-4 min-w-100 max-w-175 max-h-[80%] w-fit h-fit min-h-100 bg-linear-to-t from-black/75 to-neutral-900/75 backdrop-blur-sm
    rounded-lg border border-gray-500 flex flex-col gap-10 overflow-auto">

      {/*Header*/}
      <div className="relative flex justify-between items-center gap-10">
        <h3 className="text-2xl font-bold text-white mr-auto">
          { title ? title : ""}
        </h3>

        { isClosable &&
          <HeaderButton onClick={() => store.toggleIsOverlayEnabled()}>
            <X/>
          </HeaderButton>
        }
      </div>

      {/*Content*/}
      {children}
     </div>);
};

export default GenericContainer;