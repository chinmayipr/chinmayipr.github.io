/* ==========================================================================
   SITE DATA  —  Edit everything about yourself here.
   This is the ONLY file you need to touch for most updates.
   ========================================================================== */

window.SITE = {
  /* ----- Basic profile (shown in the sidebar on every page) ------------- */
  profile: {
    name: "Chinmayi Prabhu Baramashetru",
    title: "Postdoctoral Researcher,<br> University of Kent",
    photo: "assets/img/myphoto.JPG",
    location: "Canterbury, UK",
    emailWork: "c.baramashetru@kent.ac.uk",
    //emailPersonal: "chinmayi.prabhu@kent.ac.uk",
    social: [
      { id: "scholar", label: "Google Scholar", url: "https://scholar.google.com/citations?user=Uy018TAAAAAJ" },
      { id: "orcid", label: "ORCID", url: "https://orcid.org/0000-0001-5344-0032" },
      { id: "dblp", label: "DBLP", url: "https://dblp.org/pid/321/5982.html" },
      { id: "github", label: "GitHub", url: "https://github.com/ChinmayiBp" },
      { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/chinmayi-bp/" },
    ],
  },

  /* ----- Home page intro ------------------------------------------------ */
  intro: {
    heading: "Hello!",
    paragraphs: [
      "I am a <strong>Postdoctoral Researcher</strong> in the <strong>programming and Systems group</strong> at <strong>University of Kent</strong> " +
        "working together with <a href='https://dorchard.github.io/' target='_blank' rel='noopener'>Dominic Orchard</a>.",
      " I did my PhD from University of Oslo under the supervision of <a href='https://www.mn.uio.no/ifi/english/people/aca/sltarifa/index.html' target='_blank' rel='noopener'>Silvia Lizeth Tapia Tarifa</a> and <a href='https://www.mn.uio.no/ifi/english/people/emeriti/olaf/index.html' target='_blank' rel='noopener'>Olaf Owe</a>."+
      " My main research focuses on Programming language semantics, type theory, privacy and formal methods. I am also interested in formal verification approaches for climate models.",
    ],
  },

  /* ----- News (newest first). Shown on Home + News pages. --------------- */
  news: [

    {
      date: "16 Jun 2026",
      text: "Gave an Invited Talk at  <a href='https://durham-university--dartworkshop.replit.app/' target='_blank' rel='noopener'>DART Workshop 2026</a> in Durham, UK. Find Slides here <a href='assets/slides/DARTworkshop.pdf' target='_blank' rel='noopener'>here</a>.",
    },
    {
      date: "15 June 2026",
      text: "New paper titled <em>Formal Specification and Boundary Objects:A Two-Layered Approach to GDPR Specification </em> accepted at <strong> ISOLA 2026</strong>! Read more <a href='#'>here</a>.",
    },
    {
      date: "30 April 2026",
      text: "New paper titled <em>GEV: Statically Correct and Programmable Knowledge Graph Updates</em> accepted at <strong>IJCAI 2026</strong>! Read more <a href='#'>here</a>.",
    },
    {
      date: "18 March 2026",
      text: "Presented our paper <em>A Type System for Data Privacy Compliance in Active Object Languages</em> at <strong>Programming Journal 2026</strong>! Find paper here <a href='assets/publications/typaolpaper.pdf' target='_blank' rel='noopener'>here</a> and slides here <a href='assets/slides/typaolslides.pdf' target='_blank' rel='noopener'>here</a>.",
    },
    {
      date: "7 November 2025",
      text: "Presented at <a href='https://ncar.github.io/correctness-workshop/' target='_blank' rel='noopener'>Workshop on Correctness and Reproducibility for Earth System Software</a>. Find the slides <a href='assets/slides/NCARworkshop.pdf' target='_blank' rel='noopener'>here</a>.",
    },
    {
      date: "13 October 2025",
      text: "Presented paper <em>Towards Modelling and Verification of Coupler Behaviour in Climate Models</em> at <a href='https://conf.researchr.org/home/icfp-splash-2025/propl-2025' target='_blank' rel='noopener'>PROPL 2025</a> (co-located with ICFP/SPLASH 2025), Singapore. Find slides <a href='assets/slides/NCARworkshop.pdf' target='_blank' rel='noopener'>here</a>.",
    },
  ],

  /* ----- Publications (newest first) ------------------------------------ */
  publications: [
    {
      title:   "Formal Specification and Boundary Objects: A Two-Layered Approach to GDPR Specification",
      authors: "Chinmayi Prabhu Baramashetru",
      venue:   "ISoLA, 2026",
      tag:     "Conference",
      links:   {},
    },
    {
      title:   "GEV: Statically Correct and Programmable Knowledge Graph Updates",
      authors: "Eduard Kamburjan, Shqiponja Ahmetaj, Chinmayi Prabhu Baramashetru, Paolo Pareti",
      venue:   "IJCAI, 2026",
      tag:     "Conference",
      links:   { "Preprint": "assets/publications/ijcaipaper.pdf" },
    },
    {
      title:   "Towards Modelling and Verification of Coupler Behaviour in Climate Models",
      authors: "Chinmayi Baramashetru, Dominic Orchard",
      venue:   "PROPL '25, 2025",
      tag:     "Conference",
      links:   { "DOI": "https://doi.org/10.1145/3759536.3763801" },
    },
    {
      title:   "A Type System for Data Privacy Compliance in Active Object Languages",
      authors: "Chinmayi Prabhu Baramashetru, Paola Giannini, Silvia Lizeth Tapia Tarifa, Olaf Owe",
      venue:   "The Art, Science, and Engineering of Programming, 2025",
      tag:     "Journal",
      links:   { "DOI": "https://doi.org/10.22152/programming-journal.org/2025/10/18", "Link": "http://dx.doi.org/10.22152/programming-journal.org/2025/10/18" },
    },
    {
      title:   "GreenhouseDT: An Exemplar for Digital Twins",
      authors: "Eduard Kamburjan, Riccardo Sieve, Chinmayi Prabhu Baramashetru, Marco Amato, Gianluca Barmina, Eduard Occhipinti, Einar Broch Johnsen",
      venue:   "SEAMS '24, 2024",
      tag:     "Conference",
      links:   { "DOI": "https://doi.org/10.1145/3643915.3644108" },
    },
    {
      title:   "Assuring GDPR Conformance Through Language-Based Compliance",
      authors: "Chinmayi Prabhu Baramashetru, Silvia Lizeth Tapia Tarifa, Olaf Owe",
      venue:   "Privacy and Identity Management. Sharing in a Digital World, 2024",
      tag:     "Book Chapter",
      links:   { "DOI": "https://doi.org/10.1007/978-3-031-57978-3_4" },
    },
    {
      title:   "Integrating Data Privacy Compliance in Active Object Languages",
      authors: "Chinmayi Prabhu Baramashetru, Silvia Lizeth Tapia Tarifa, Olaf Owe",
      venue:   "Active Object Languages: Current Research Trends, 2024",
      tag:     "Book Chapter",
      links:   { "DOI": "https://doi.org/10.1007/978-3-031-51060-1_10" },
    },
    {
      title:   "A Policy Language to Capture Compliance of Data Protection Requirements",
      authors: "Chinmayi Prabhu Baramashetru, Silvia Lizeth Tapia Tarifa, Olaf Owe, Nils Gruschka",
      venue:   "Integrated Formal Methods, 2022",
      tag:     "Book Chapter",
      links:   { "DOI": "https://doi.org/10.1007/978-3-031-07727-2_16" },
    },
  ],

  /* ----- Talks (newest first) ------------------------------------------- */
  talks: [
    {
      date: "Jun 2026",
      title: "Invited Talk at DART Workshop 2026",
      venue: "<a href='https://durham-university--dartworkshop.replit.app/' target='_blank' rel='noopener'>DART Workshop 2026</a>, Durham, UK",
      links: { Slides: "assets/slides/DARTworkshop.pdf" },
    },
    {
      date: "Mar 2026",
      title: "A Type System for Data Privacy Compliance in Active Object Languages",
      venue: "Programming Journal, 2026",
      links: { Slides: "assets/slides/typaolslides.pdf", Paper: "assets/publications/typaolpaper.pdf" },
    },
    {
      date: "Nov 2025",
      title: "Talk at Workshop on Correctness and Reproducibility for Earth System Software",
      venue: "<a href='https://ncar.github.io/correctness-workshop/' target='_blank' rel='noopener'>NCAR Correctness Workshop</a>, 2025",
      links: { Slides: "assets/slides/NCARworkshop.pdf" },
    },
    {
      date: "Oct 2025",
      title: "Towards Modelling and Verification of Coupler Behaviour in Climate Models",
      venue: "<a href='https://conf.researchr.org/home/icfp-splash-2025/propl-2025' target='_blank' rel='noopener'>PROPL 2025</a> @ ICFP/SPLASH 2025, Singapore",
      links: { Slides: "assets/slides/NCARworkshop.pdf", DOI: "https://doi.org/10.1145/3759536.3763801", Preprint: "http://plas4sci.github.io/assets/propl25-preprint.pdf" },
    },
    {
      date: "Sep 2025",
      title: "Data Privacy Compliance by Construction in Distributed Systems",
      venue: "PhD Defence @ University of Oslo",
      links: { Slides: "assets/slides/thesisslides.pdf", Preprint: "https://hdl.handle.net/11250/3216262" },
    },
  ],

  /* ----- Teaching ------------------------------------------------------- */
  teaching: {
    intro: "Courses and teaching activities I have been involved in.",
    courses: [
      {
        period: "2025–2026",
        title: "Foundations of Computing (COMP4105)",
        role: "Teaching Assistant",
        institution: "University of Kent",
        description: "Supported instruction in mathematical methods for computer science, including algebra, reasoning and proof, set theory, functions, statistics, logic, and probability.",
        links: { "Course page": "https://www.kent.ac.uk/courses/modules/module/COMP4105" },
      },
      {
        period: "2025–Present",
        title: "Functional Programming (COMP5002)",
        role: "Teaching Assistant",
        institution: "University of Kent",
        description: "Supported instruction in functional programming concepts and practical programming in Haskell.",
        links: { "Course page": "https://www.kent.ac.uk/courses/modules/module/COMP5002" },
      },
      {
        period: "2023",
        title: "Programming Languages (IN3040)",
        role: "Guest Lecturer",
        institution: "University of Oslo",
        description: "Lectured on Rust programming with a focus on memory models, type systems, and associated programming paradigms.",
        links: { "Course page": "https://www.uio.no/studier/emner/matnat/ifi/IN3040/h23/index.html" },
      },
      {
        period: "2022",
        title: "Adaptive Methods for Data-Based Decision Making (IN-STK5000)",
        role: "Guest Lecturer",
        institution: "University of Oslo",
        description: "Delivered lectures on privacy-preserving data analysis, including anonymisation techniques, encryption methods, and secure data processing approaches.",
        links: { "Course page": "https://www.uio.no/studier/emner/matnat/ifi/IN-STK5000/h22/index.html" },
      },
      {
        period: "2021–2022",
        title: "Models of Concurrency (IN5170)",
        role: "Teaching Assistant",
        institution: "University of Oslo",
        description: "Developed teaching materials on concurrency models and type theory; conducted practical sessions covering core concepts with hands-on examples in Java and Rust.",
        links: { "Course page": "https://www.uio.no/studier/emner/matnat/ifi/IN5170/index-eng.html" },
      },
    ],
  },

  /* ----- CV ------------------------------------------------------------- */
  cv: {
    pdf: "assets/cv/CV2026.pdf",
    education: [
      { period: "Nov 2020 – Feb 2025", text: "PhD in Computer Science, University of Oslo — <em>Data Privacy Compliance by Construction in Distributed Systems</em>" },
      { period: "Oct 2018 – Feb 2020", text: "MSc in Information Systems and Technology, City, University of London " },
      { period: "Jul 2012 – Oct 2016", text: "BEng in Electronics and Communication Engineering, BIET, Karnataka (First Class with Distinction, Dean's List)" },
    ],
    positions: [
      { period: "Mar 2025 – Present", text: "Research Associate (Postdoc), University of Kent, Canterbury" },
      { period: "Nov 2020 – Feb 2025", text: "PhD Research Fellow, University of Oslo" },
      { period: "2019 – 2020", text: "Data Analyst, IORA Healthcare, London" },
      { period: "2016 – 2018", text: "Assistant System Engineer, TATA Consultancy Services (Apple iCloud), Bangalore" },
    ],
  },

  /* ----- Footer --------------------------------------------------------- */
  footerName: "Chinmayi Prabhu Baramashetru",
};
