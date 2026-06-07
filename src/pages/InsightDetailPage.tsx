import { Helmet } from 'react-helmet-async'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useSiteData } from '@contexts/SiteContext'
import { SvgIcon } from '@utils/icon'
import { Chip } from '@components/UI'

export function InsightDetailPage() {
  const { id } = useParams()
  const { insights } = useSiteData()
  const insight = insights.find((i) => i.id === id)

  if (!insight) return <Navigate to="/insights" replace />

  return (
    <>
      <Helmet>
        <title>{insight.title} — Shubham International</title>
        <meta name="description" content={insight.excerpt} />
      </Helmet>

      <section className="py-[clamp(48px,6vw,80px)]">
        <div className="container-wide max-w-[760px]">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-8 text-[.92rem]"
          >
            <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4 [&_svg]:rotate-180" />
            Back to Articles
          </Link>

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {insight.image && (
              <div className="aspect-[21/9] bg-bg-alt overflow-hidden">
                <img src={insight.image} alt={insight.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-[clamp(28px,4vw,48px)]">
              <Chip>{insight.category}</Chip>

              <h1 className="text-[clamp(1.6rem,3.6vw,2.6rem)] mt-4 mb-3">{insight.title}</h1>

              {insight.date && (
                <span className="text-[.85rem] text-slate-400">{insight.date}</span>
              )}

              <p className="text-[1.05rem] text-slate-500 mt-6 mb-8 italic border-l-3 border-cyan-300 pl-[18px]">{insight.excerpt}</p>

              {insight.content ? (
                <div
                  className="text-[.98rem] leading-relaxed space-y-6 [&_p]:text-slate-600"
                  dangerouslySetInnerHTML={{ __html: insight.content }}
                />
              ) : (
                <p className="text-slate-400">Full article content coming soon.</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-teal-600 font-bold hover:underline"
            >
              <SvgIcon name="arrow" className="[&_svg]:w-4 [&_svg]:h-4 [&_svg]:rotate-180" />
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
