export function BattleMapPanel() {
  return (
    <section className="min-w-0 border-b border-slate-800 p-4 lg:border-r lg:border-b-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Battle Map</h2>
          <p className="text-xs font-semibold text-slate-500">
            Combat view · Grid on
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-400">
          <span>Zoom 125%</span>
          <button type="button" className="hover:text-slate-100">
            Pan
          </button>
          <button type="button" className="hover:text-slate-100">
            Select Actor
          </button>
          <button type="button" className="hover:text-slate-100">
            Grid Toggle
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative aspect-4/3 w-full max-w-152.5 overflow-hidden bg-[#eee9df] shadow-[inset_6px_6px_0_rgba(15,23,42,0.22)]">
          <div className="absolute inset-5 bg-[#d8d0bf]" />
          <div className="absolute top-5 left-7 z-10 h-12 w-44 bg-white/70 px-4 py-3 text-[11px] font-semibold text-slate-400">
            Selected Actor
          </div>
          <div className="absolute top-11.25 left-22 z-10 h-23.5 w-34.5 rounded-sm bg-[#9bb084]" />
          <div className="absolute right-17 bottom-14.5 z-10 h-[84px] w-[126px] rounded-sm bg-[#93a97b]" />
          <div className="absolute top-[112px] left-[34px] h-[78px] w-[520px] origin-left rotate-[-20deg] bg-[#bd9e68]" />
          <div className="absolute top-[168px] left-[302px] h-6 w-24 bg-[#685039]" />
          <span className="absolute top-[156px] left-[315px] size-5 rounded-sm bg-[#ded0b7]" />
          <span className="absolute top-[220px] left-[260px] size-5 rounded-sm bg-[#ded0b7]" />
          <span className="absolute top-[248px] left-[242px] size-5 rounded-sm bg-black" />
          <span className="absolute top-[236px] left-[210px] size-8 rounded-sm border-4 border-orange-500" />
          <span className="absolute top-[104px] right-[116px] size-5 rounded-sm bg-[#8d614d]" />
          <span className="absolute top-[126px] right-[92px] size-5 rounded-sm bg-[#6f6253]" />
        </div>
      </div>
    </section>
  )
}
