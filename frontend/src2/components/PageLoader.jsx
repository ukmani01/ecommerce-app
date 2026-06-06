const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="relative">
      <div className="w-10 h-10 rounded-full border-2 border-ink-200 border-t-brand-500 animate-spin" />
    </div>
    <p className="text-ink-400 text-sm font-medium tracking-wide">Loading...</p>
  </div>
);
export default PageLoader;