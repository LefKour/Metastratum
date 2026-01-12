import InteractiveHeightmapGrid from '@/app/components/InteractiveHeightmapGrid';

export default function Home() {
  return (
      <main className="w-full h-full justify-between bg-linear-to-t from-black to-neutral-900">
        {/*Background*/}
        <InteractiveHeightmapGrid />
      </main>
  );
}
