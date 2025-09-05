export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-800/20 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
