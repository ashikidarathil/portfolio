import Link from "next/link";
import { ContactForm } from "@/components/site/ContactForm";
import { CopyEmail, PostList } from "@/components/site/client";
import { getExperience, getPosts, getProfile, getProjects, getSkillGroups } from "@/lib/data";
import { nameLines } from "@/lib/utils";
import { postRow } from "@/lib/view";

export const revalidate = 3600;

export default async function Home() {
  const [p, projects, groups, exp, posts] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkillGroups(),
    getExperience(),
    getPosts(),
  ]);
  const [first, last] = nameLines(p.name);
  const marquee = groups.flatMap((g) => g.items).slice(0, 12);

  return (
    <>
      <section className="hero">
        <h1 className="name">
          <span><i>{first}</i></span>
          {last && <span><i>{last}<b>.</b></i></span>}
        </h1>
        <div className="hero-meta">
          <dl className="facts">
            {p.status && <div><dt>Status</dt><dd><span className="dot" />{p.status}</dd></div>}
            {p.shortLocation && <div><dt>Based</dt><dd>{p.shortLocation}</dd></div>}
            {p.stackLabel && <div><dt>Stack</dt><dd>{p.stackLabel}</dd></div>}
          </dl>
          <p className="lead">{p.lead}</p>
          <div className="cta">
            <Link className="btn" href="/work">See the work →</Link>
            <a className="ul" href="#contact">Get in touch</a>
            {p.resumeUrl && <a className="ul" href={p.resumeUrl} target="_blank" rel="noopener">Download resume</a>}
          </div>
        </div>
        {marquee.length > 0 && (
          <div className="marq" aria-hidden="true">
            <div>
              {[...marquee, ...marquee].map((s, i) => (
                <span key={i}>{s}<b>✦</b></span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="sec" id="about">
        <span className="lbl">About</span>
        <div className="about-body">
          {p.aboutHeading && <h2 className="h2">{p.aboutHeading}</h2>}
          {p.aboutBody && <p>{p.aboutBody}</p>}
          {p.principles.length > 0 && (
            <div className="principles">
              {p.principles.map((x) => (
                <div key={x.title}><h4>{x.title}</h4><p>{x.description}</p></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sec" id="work">
        <span className="lbl">Selected work</span>
        <div>
          <div className="sec-head">
            <h2 className="h2">{projects.length === 1 ? "One project, live." : `${projects.length} projects, all live.`}</h2>
            <Link className="ul" href="/work">All projects →</Link>
          </div>
          {projects.length ? (
            <ul className="list">
              {projects.slice(0, 5).map((x) => (
                <li key={x._id}>
                  <Link href={`/work/${x.slug}`}>
                    <span className="yr">{x.year}</span>
                    <span className="tt">{x.title}</span>
                    <span className="st">{x.stack.slice(0, 4).join(" · ")}</span>
                    <span className="ar">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">Projects are on the way.</p>
          )}
        </div>
      </section>

      {groups.length > 0 && (
        <section className="sec" id="skills">
          <span className="lbl">Skills</span>
          <div className="skills">
            {groups.map((g) => (
              <div key={g._id}>
                <h4>{g.name}</h4>
                <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {exp.length > 0 && (
        <section className="sec" id="experience">
          <span className="lbl">Experience</span>
          <div className="exp">
            {exp.map((e) => (
              <div key={e._id}>
                <span className="per">{e.period}</span>
                <div>
                  <h4>{e.title}</h4>
                  <p>{e.description}</p>
                  <div className="tagrow">{e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="sec" id="writing">
          <span className="lbl">Blog</span>
          <div>
            <div className="sec-head">
              <h2 className="h2">Notes from building things.</h2>
              <Link className="ul" href="/blog">All posts →</Link>
            </div>
            <PostList posts={posts.slice(0, 3).map(postRow)} />
          </div>
        </section>
      )}

      <section className="contact" id="contact">
        <h2 className="big">Let&apos;s<br />talk<b>.</b></h2>
        <div className="cgrid">
          <div className="cinfo">
            {p.email && <div><span className="k">Email</span><CopyEmail email={p.email} /></div>}
            {p.location && <div><span className="k">Based in</span>{p.location}</div>}
            {p.socials.length > 0 && (
              <div>
                <span className="k">Elsewhere</span>
                <div className="socials">
                  {p.socials.map((s) => (
                    <a key={s.url} className="ul" href={s.url} target="_blank" rel="noopener">{s.name}</a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
