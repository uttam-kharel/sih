import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { Chip } from '@components/UI'

export function InsightsPage() {
  const { insights } = useSiteData()

  return (
    <>
      <Helmet>
        <title>Health Insights — Shubham International</title>
        <meta name="description" content="Latest health articles, news, and insights from Shubham International Hospital." />
      </Helmet>

      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-wide">
          <div className="max-w-[50ch] mb-12">
            <p className="font-body font-bold text-[.8rem] tracking-[.18em] uppercase text-teal-600">Health Insights</p>
            <h1 className="text-[clamp(2rem,4.6vw,3.4rem)] mt-[18px]">
              Latest <span className="text-teal-600">Articles</span> & News
            </h1>
            <div className="w-[60px] h-1 bg-teal-600 rounded my-[22px]" />
            <p className="text-slate-500 text-[1.05rem]">Stay informed with the latest in healthcare, wellness tips, and hospital updates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            {insights.length === 0 && (
              <p className="text-slate-400 col-span-full text-center py-20">No articles available yet.</p>
            )}
            {insights.map((i) => (
              <Link key={i.id} to={`/insights/${i.id}`} className="bg-white rounded-lg overflow-hidden border border-border flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-[16/9] bg-bg-alt overflow-hidden">
                  {i.image ? (
                    <img src={i.image} alt={i.title} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold">
                      <SvgIcon name="image" className="[&_svg]:w-10 [&_svg]:h-10" />
                    </div>
                  )}
                </div>
                <div className="p-[22px] flex flex-col flex-1">
                  <Chip>{i.category}</Chip>
                  <h3 className="text-[1.12rem] mt-3 mb-2 leading-snug">{i.title}</h3>
                  <p className="text-[.9rem] text-slate-500 flex-1">{i.excerpt}</p>
                  {i.date && (
                    <span className="text-[.8rem] text-slate-400 mt-4">{i.date}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
