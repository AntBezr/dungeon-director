export function SceneCanvas() {
  return (
    <section className="min-w-0 border-b border-slate-800 p-5 lg:border-r lg:border-b-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-slate-100">
          Forest Road Encounter
        </h2>
        <div className="flex gap-3 text-xs font-semibold text-slate-500">
          <span>100%</span>
          <button type="button" className="hover:text-slate-100">
            Grid
          </button>
          <button type="button" className="hover:text-slate-100">
            Snap
          </button>
          <button type="button" className="hover:text-slate-100">
            Fog
          </button>
        </div>
      </div>

      <div className="mt-4 bg-[#f7f6f2] p-4">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-[#d8d0bf]">
          <div className="absolute top-[13%] left-[10%] h-[22%] w-[26%] rounded-sm bg-[#9cac8e]" />
          <div className="absolute right-[10%] bottom-[17%] h-[22%] w-[25%] rounded-sm bg-[#94a87c]" />
          <div className="absolute top-[38%] left-[5%] h-[18%] w-[92%] origin-left rotate-[-25deg] bg-[#bd9e68]" />
          <div className="absolute top-[35%] left-[53%] h-[6%] w-[17%] bg-[#72583d]" />
          <span className="absolute top-[32%] left-[57%] size-5 rounded-sm bg-[#ded0b7]" />
          <span className="absolute top-[55%] left-[44%] size-5 rounded-sm bg-orange-500" />
          <span className="absolute top-[58%] left-[50%] size-6 rounded-sm bg-black" />
          <span className="absolute top-[27%] right-[18%] size-5 rounded-sm bg-[#8d614d]" />
          <span className="absolute top-[31%] right-[13%] size-5 rounded-sm bg-[#6f6253]" />
        </div>
        <div className="h-28 bg-white" />
      </div>
    </section>
  )
}
