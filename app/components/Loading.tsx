export default function Loading() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full border-3 border-r-white/30 border-t-white/30 animate-spin border-b-transparent border-l-white/30"></div>
      <span className="text-white/30">Pensando...</span>
    </div>
  );
}
