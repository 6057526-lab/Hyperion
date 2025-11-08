import styles from "./page.module.css";

const heroHighlights = [
  "Lightweight Metal Expertise",
  "End-to-End Engineering (Design → Simulation → Serial Production)",
  "High-Performance Results (Strength, efficiency, certification)",
];

const marketSegments = [
  {
    title: "Automotive",
    description:
      "Magnesium and aluminium forged wheels and blanks, brake and suspension components, exhaust elements, interior structural parts, and 3D-printed custom parts (logos, ducts, emblems) for motorsport and premium vehicle programs.",
    items: [
      "Forged magnesium & aluminium wheels",
      "Forged wheel blanks",
      "Brake brackets & cooling ducts",
      "Wrought / formed exhaust parts",
      "Automotive sheet components",
      "3D-printed metal parts",
    ],
  },
  {
    title: "Aerospace",
    description:
      "Precision light-alloy components for airframe, rotorcraft and space applications, including brackets, transmission housings, interior parts and turbine engine elements — produced to aerospace process control.",
    items: [
      "Magnesium & aluminium brackets",
      "Transmission / gearbox casings",
      "Interior & seat structure parts",
      "Turbine engine components",
      "Forged wheels & blanks for ground support",
      "Magnesium antenna boxes",
    ],
  },
  {
    title: "Industrial & Material Supply",
    description:
      "From raw magnesium feedstock to semi-finished products, REEMS supports manufacturers with chips, flakes, granules, powders, billets, sheets, extrusions and forged parts — plus CNC, surface protection and coating.",
    items: [
      "Magnesium raw materials (chips, flakes, powders, granules)",
      "Billets, sheet, extrusion, forgings",
      "CNC machining services",
      "Sheet metal forming",
      "Surface protection: anodizing, PEO, PVD, powder coating",
    ],
  },
  {
    title: "Special Components",
    description:
      "Engineering of difficult, lightweight parts for defence, telecoms, motorsport and space, including electromagnetic shielding materials, reinforced housings and complex 3D-printed geometries (SLM, WAAM).",
    items: [
      "Forged magnesium casings",
      "Complex 3D-printed metal parts",
      "Hybrid / reinforced materials",
      "Carbon-carbon materials",
    ],
  },
];

const lifecyclePhases = [
  {
    title: "Research & Development",
    body: "Our engineering team has been involved in magnesium and advanced-alloy R&D together with leading OEMs and research institutes. We develop proprietary alloys, forming routes and additive processes to increase strength, corrosion resistance and fatigue life for automotive and aerospace applications.",
  },
  {
    title: "Engineering & Prototyping",
    body: "Each component is optimized for its final use. REEMS uses CAE tools (ANSYS / FEA, LS-DYNA, macro- to nano-mechanical simulations) and advanced reverse-engineering software (Geomagic, Materialise, SolidWorks, Siemens NX) to shorten prototype lead time and ensure formability before tool production.",
  },
  {
    title: "Industrialization & Serial Production",
    body: "Our proprietary closed-die, net-shape forging processes (6,000–30,000 t hydraulic force) deliver directional fibre flow and deep deformation, resulting in superior grain structure and outstanding fatigue/strength properties — ideal for wheels, suspension parts and aerospace brackets.",
  },
  {
    title: "Testing & Certification",
    body: "REEMS validates, tests and certifies parts to international industry standards. We provide mechanical, metallurgical and chemical testing, CMM, and partner with TÜV and other notified bodies for third-party certification.",
  },
];

const capabilities = [
  {
    title: "Raw Materials",
    description:
      "Magnesium, aluminium and titanium materials in multiple formats: chips, flakes, granules, powders, billets, slabs, sheets and extrusion stock. Ideal for casting, forging, additive and hybrid manufacturing routes.",
    mediaNotes: [
      "Photo 1: Al/Mg granules",
      "Photo 2: Al/Mg billets",
      "Photo 3: Al/Mg powder",
      "Photo 4: Al/Mg wire feedstock",
    ],
  },
  {
    title: "Forging",
    description:
      "Closed-die forging of magnesium, titanium and aluminium components, wheel blanks, aerospace brackets, casings and structural parts with controlled metal flow and fibre orientation for maximum mechanical properties.",
    highlights: [
      "6,000–30,000 t hydraulic press range",
      "Component size capability up to 30”",
      "Near-net shape to reduce machining",
    ],
    mediaNotes: [
      "Photo 1: wheel",
      "Photo 2: wheel net-shaped blank",
      "Photo 3: generic blank",
      "Photo 4: forged ring",
    ],
  },
  {
    title: "Extrusion & Rolling",
    description:
      "Profile extrusion and sheet forming for automotive and industrial parts, including from magnesium alloys. Magnesium sheet as thin as 0.6 mm with widths of 1,000 mm and lengths up to 15,000 mm.",
    mediaNotes: [
      "Photo 1: CNC 5-axis",
      "Photo 2: 3D printed part (bracket)",
      "Photo 3: Colored wheel",
      "Photo 4: Rolled sheet (thin)",
    ],
  },
  {
    title: "Machining",
    description:
      "Precision CNC machining, turning and finishing for forged wheels, structural components and complex geometries ready for assembly or surface protection.",
    mediaNotes: [
      "Photo 1: CNC 5-axis",
      "Photo 2: Wheel machining process",
      "Photo 3: Part machining process",
      "Photo 4: Lathe-turned wheels",
    ],
  },
  {
    title: "3D Printing",
    description:
      "Additive manufacturing of complex magnesium, aluminium and titanium parts using SLM, WAAM and hybrid approaches for motorsport, aerospace and industrial programs.",
    mediaNotes: [
      "Photo 1: 3D printed part (BCD)",
      "Photo 2: 3D printed bracket",
      "Photo 3: 3D printed motor component",
      "Photo 4: 3D printed bracket (variant)",
    ],
  },
  {
    title: "Surface Protection",
    description:
      "Surface protection according to application requirements for premium appearance and long-term durability on magnesium, aluminium and titanium components.",
    highlights: ["Anodizing", "Plasma Electrolytic Oxidation (PEO)", "PVD", "Powder coating"],
    mediaNotes: [
      "Photo 1: wheel finish 1",
      "Photo 2: two-tone wheel",
      "Photo 3: multi-color finish",
      "Photo 4: polished surface",
    ],
  },
];

const wheelHighlights = [
  "1-, 2- and 3-piece wheel concepts",
  "Magnesium and 2000/6000/7000-series aluminium",
  "Custom offsets, PCD and centre-lock variants",
  "Flow-optimized spokes and brake-cooling geometry",
  "Ready for premium surface finishing",
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} id="top">
          <div className={styles.heroInner}>
            <p className={styles.tag}>REEMS</p>
            <h1 className={styles.headline}>Race &amp; Engineering Elite Manufacturing Services</h1>
            <p className={styles.subheadline}>
              Advanced magnesium, aluminium and titanium solutions for high-performance automotive,
              aerospace and industrial applications.
            </p>
            <p className={styles.description}>
              REEMS combines engineering, proprietary forging and additive technologies to deliver
              ultra-light, high-strength components — from forged wheels to aerospace brackets and
              complex 3D-printed parts.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.primaryButton} href="#capabilities">
                Explore capabilities
              </a>
              <a className={styles.secondaryButton} href="#contact">
                Request a project review
              </a>
            </div>
          </div>
          <aside className={styles.heroAside}>
            <p className={styles.secondaryDescription}>
              REEMS facilitates manufacturing services for high-performance industries — from
              motorsport to aerospace — specializing in forged magnesium &amp; aluminum components,
              advanced prototyping, and full production solutions.
            </p>
            <ul className={styles.featureList}>
              {heroHighlights.map((item) => (
                <li key={item} className={styles.featureItem}>
                  {item}
                </li>
              ))}
            </ul>
            <a className={styles.calloutButton} href="#contact">
              Start your project
            </a>
          </aside>
        </section>

        <section className={styles.section} id="market-segments">
          <div className={styles.sectionHeader}>
            <p className={styles.tag}>Market Segments</p>
            <h2 className={styles.sectionHeading}>
              Supplying ultra-light, certified components to global OEMs and Tier-1s
            </h2>
          </div>
          <div className={styles.marketGrid}>
            {marketSegments.map((segment) => (
              <article key={segment.title} className={styles.marketCard}>
                <h3 className={styles.cardTitle}>{segment.title}</h3>
                <p className={styles.cardDescription}>{segment.description}</p>
                <ul className={styles.cardList}>
                  {segment.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="lifecycle">
          <div className={styles.sectionHeader}>
            <p className={styles.tag}>Full Product Lifecycle</p>
            <h2 className={styles.sectionHeading}>
              At REEMS we don’t just forge a part — we engineer the whole lifecycle.
            </h2>
            <p className={styles.sectionSubheading}>
              Our team translates performance targets (weight, stiffness, thermal, fatigue) into
              manufacturable, cost-efficient light-alloy solutions.
            </p>
          </div>
          <div className={styles.lifecycleGrid}>
            {lifecyclePhases.map((phase) => (
              <article key={phase.title} className={styles.lifecycleItem}>
                <h3 className={styles.lifecycleTitle}>{phase.title}</h3>
                <p className={styles.lifecycleText}>{phase.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="capabilities">
          <div className={styles.sectionHeader}>
            <p className={styles.tag}>Capabilities</p>
            <h2 className={styles.sectionHeading}>Innovative Materials and Technologies</h2>
          </div>
          <div className={styles.capabilitiesGrid}>
            {capabilities.map((capability) => (
              <article key={capability.title} className={styles.capability}>
                <div>
                  <h3 className={styles.capabilityTitle}>{capability.title}</h3>
                  <p className={styles.capabilityDescription}>{capability.description}</p>
                </div>
                {(capability.highlights || capability.mediaNotes) && (
                  <div className={styles.capabilityDetails}>
                    {capability.highlights && (
                      <div>
                        <p className={styles.capabilitySubheading}>Key points</p>
                        <ul className={styles.detailList}>
                          {capability.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {capability.mediaNotes && (
                      <div>
                        <p className={styles.capabilitySubheading}>Planned imagery</p>
                        <ul className={styles.noteList}>
                          {capability.mediaNotes.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.wheelSection}`} id="wheels">
          <div className={styles.sectionHeader}>
            <p className={styles.tag}>Forged Aluminium and Magnesium Wheels</p>
            <h2 className={styles.sectionHeading}>
              Motorsport-grade, road-ready, weight-optimized
            </h2>
            <p className={styles.sectionSubheading}>
              REEMS designs and manufactures forged wheels and wheel blanks for performance,
              motorsport and premium OEM programs. Using proprietary forging technology and
              high-strength light alloys, we achieve an optimal balance between mass reduction,
              stiffness and impact resistance — even for demanding racing environments.
            </p>
          </div>
          <ul className={styles.detailList}>
            {wheelHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className={styles.primaryButton} href="#contact">
            Send us your wheel specification
          </a>
        </section>

        <section className={`${styles.section} ${styles.companySection}`} id="company">
          <div className={styles.sectionHeader}>
            <p className={styles.tag}>Company</p>
            <h2 className={styles.sectionHeading}>
              Race &amp; Engineering Elite Manufacturing Services
            </h2>
          </div>
          <div className={styles.companyContent}>
            <p>
              REEMS is a European engineering and manufacturing company focused on light-alloy
              solutions for mobility, aerospace and advanced industrial sectors. Building on two
              decades of magnesium and aluminium know-how, we integrate forging, extrusion, CNC,
              additive manufacturing and surface protection into one supply chain.
            </p>
            <p>
              Our mission is to help OEMs and Tier-1s remove weight, improve performance and
              accelerate time-to-market through intelligent materials and robust manufacturing
              processes.
            </p>
            <div className={styles.companyActions}>
              <p className={styles.muted}>Let’s Build What Others Think Is Impossible.</p>
              <p className={styles.muted}>
                Send us your design, problem, or challenge — our engineering team will take it from
                concept to production.
              </p>
              <a className={styles.secondaryButton} href="#contact">
                Share your challenge
              </a>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contactSection}`} id="contact">
          <h2 className={styles.sectionHeading}>Ready to get started?</h2>
          <p className={styles.sectionSubheading}>
            Tell us about your program, performance targets or materials challenge. We’ll schedule a
            project review and outline the next steps for engineering, prototyping or serial
            production.
          </p>
          <a className={styles.primaryButton} href="mailto:info@reems-manufacturing.com">
            Start your project
          </a>
        </section>
      </main>
    </div>
  );
}
