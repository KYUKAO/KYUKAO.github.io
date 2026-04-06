/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              config.js — 网站配置文件                        ║
 * ║                                                              ║
 * ║  ★ 这是你唯一需要编辑的文件 ★                                ║
 * ║  修改下方内容后，刷新浏览器即可看到效果                        ║
 * ║  每项旁边都有注释说明，按照格式填写即可                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  /* ============================================================
     § 1. 个人基本信息
     ============================================================ */

  name: {
    en: 'Hanqing Li',
    zh: '李涵清',
    alias: 'KYUKAO',
  },

  role: {
    en: 'Technical Artist · Game Creator',
    zh: '技术美术师 · 游戏创作者',
  },

  location: {
    en: 'Shanghai, China',
    zh: '中国 · 上海',
  },

  experience: {
    en: '3+ years in game industry',
    zh: '3 年以上游戏行业经验',
  },

  languages: {
    en: 'Chinese (native) / English (professional)/Japanese',
    zh: '中文（母语）/ 英文（专业阅读）/日语',
  },

  status: {
    en: 'Open to new opportunities · Available for projects',
    zh: '开放新机会 · 可接项目合作',
  },

  contact: {
    email:      'kyuandart@sina.com',
    github:     'https://kyukao.github.io/index.html',
    artstation: 'N/A',
    linkedin:   'https://www.linkedin.com/in/hanqing-li-000069223',
    tel:        '13061878150',
  },

  copyright: '© 2026 Hanqing Li · All rights reserved',


  /* ============================================================
     § 2. 首页文字
     ============================================================ */

  home: {
    subtitle: {
      en: 'Technical Artist · <span style="color:var(--pink)">Kyukao</span>',
      zh: '技术美术师 · <span style="color:var(--pink)">九十九</span>',
    },

    about: {
      title: { en: 'Technical Artist', zh: '游戏技术美术' },
      desc: {
        en: 'Focused on the intersection of game visuals and technology — specializing in shader development, procedural content generation, and real-time rendering optimization.',
        zh: '专注于游戏视觉技术与艺术的交叉领域，擅长 Shader 开发、程序化内容生成与实时渲染优化。致力于将技术与美学融合，打造沉浸式游戏视觉体验。',
      },
    },

    stats: [
      { num: '3+', label: { en: 'Years of Experience', zh: '年从业经验' } },
      { num: '20+', label: { en: 'Projects Completed', zh: '完成项目' } },
      { num: '5+', label: { en: 'Games Shipped', zh: '参与游戏' } },
      { num: '∞', label: { en: 'Passion for Games', zh: '对游戏的热爱' } },
    ],

    skills: [
      'HLSL / GLSL',
      'Unity URP / HDRP',
      'Unreal Engine 5',
      'Houdini',
      'Python',
      'Maya',
      'Substance Painter',
      'Shader Graph',
      'Niagara VFX',
      'C#',
      'Procedural Generation',
      'Real-time Rendering',
    ],
  },


  /* ============================================================
     § 3. 关于我页面
     ============================================================ */

  about: {
    bio: {
      en: 'A technical artist who loves games — focused on shader development, procedural content, and real-time rendering. I believe the boundary between technology and art was always blurred: the best visuals in games are poetry written in code.',
      zh: '热爱游戏的技术美术师，专注于 Shader 开发、程序化内容生成与实时渲染。相信技术与艺术的边界本就模糊——最好的游戏画面，是代码写出来的诗。',
    },

    desc: {
      en: 'Fell in love with games early on and taught myself shader programming in college. I enjoy solving "can this effect even be done?" questions — most of the time the answer is yes. In my free time I make Game Jam games and explore the aesthetic potential of indie development.',
      zh: '从小热爱游戏，大学期间自学 Shader 编程并一头扎进技术美术领域。喜欢解决"这个效果能实现吗"这类问题——大多数时候，答案是可以的。业余时间喜欢制作 Game Jam 游戏，探索独立游戏的美学可能性。',
    },

    photo: '',

    interests: [
      {
        icon:  '⚡',
        title: { en: 'Real-time Rendering', zh: '实时渲染' },
        desc:  { en: 'Exploring GPU-driven rendering, ray tracing, and deferred pipeline frontiers.',
                 zh: '探索 GPU 驱动渲染、光线追踪与延迟渲染管线的前沿技术。' },
      },
      {
        icon:  '🌀',
        title: { en: 'Procedural Generation', zh: '程序化生成' },
        desc:  { en: 'Using math and noise to create infinitely varied worlds — terrain, vegetation, cities.',
                 zh: '用数学和噪波创造无限变化的世界——地形、植被、城市。' },
      },
      {
        icon:  '🎮',
        title: { en: 'Indie Games', zh: '独立游戏' },
        desc:  { en: 'Passionate about Game Jams; believing small teams can create stunning work.',
                 zh: '热衷于 Game Jam，相信小团队也能做出令人惊叹的作品。' },
      },
      {
        icon:  '🔬',
        title: { en: 'Technical Research', zh: '技术研究' },
        desc:  { en: 'Continuously studying SIGGRAPH papers and converting research into engineering practice.',
                 zh: '持续学习 SIGGRAPH 论文，将学术前沿转化为工程实践。' },
      },
    ],
  },


  /* ============================================================
     § 4. 作品集
     ============================================================ */

  works: [
    {
      category: 'shader',
      hasVideo: true,
      image: '',
      title: { en: 'Water Refraction Shader', zh: '水面折射着色器' },
      desc:  {
        en: 'Real-time water refraction and reflection shader based on SSR, with dynamic wave deformation and foam generation.',
        zh: '基于 SSR 的实时水面折射与反射 Shader，支持动态波浪形变与泡沫生成。',
      },
      tags: ['Shader', 'Unity'],
      links: [
        { label: { en: 'View Details →', zh: '查看详情 →' }, href: '#' },
        { label: { en: 'GitHub', zh: 'GitHub' }, href: '#' },
        { label: { en: 'Watch Video →', zh: '观看视频 →' }, href: 'https://raw.githubusercontent.com/KYUKAO/KYUKAO.github.io/main/assets/uploads/视频1.mp4' },
      ],
    },
    {
      category: 'vfx',
      hasVideo: true,
      image: '',
      title: { en: 'Particle Explosion System', zh: '粒子爆炸系统' },
      desc:  {
        en: 'UE5 Niagara particle system with physics-driven dynamic explosions and debris scatter.',
        zh: 'UE5 Niagara 粒子系统，实现物理模拟驱动的动态爆炸与碎片飞溅效果。',
      },
      tags: ['VFX', 'Niagara'],
      links: [
        { label: { en: 'Watch Video →', zh: '查看视频 →' }, href: '#' },
      ],
    },
    {
      category: 'tool',
      hasVideo: false,
      image: '',
      title: { en: 'Maya Auto-Rigging Tool', zh: 'Maya 自动绑定工具' },
      desc:  {
        en: 'Python script that auto-detects skeleton hierarchy and transfers skin weights in one click — 80% faster rigging.',
        zh: 'Python 脚本，实现角色骨骼自动识别与蒙皮权重一键迁移，提升绑定效率 80%。',
      },
      tags: ['Tool', 'Python', 'Maya'],
      links: [
        { label: { en: 'View Code →', zh: '查看代码 →' }, href: '#' },
        { label: { en: 'GitHub', zh: 'GitHub' }, href: '#' },
      ],
    },
    {
      category: 'render',
      hasVideo: false,
      image: '',
      title: { en: 'Cyberpunk Scene Render', zh: '赛博朋克场景渲染' },
      desc:  {
        en: 'UE5 Lumen global illumination scene — a hand-crafted cybercity street pushing real-time rendering limits.',
        zh: 'UE5 Lumen 全局光照场景，手工搭建赛博都市街头，探索实时渲染边界。',
      },
      tags: ['Render', 'UE5'],
      links: [
        { label: { en: 'View Details →', zh: '查看详情 →' }, href: '#' },
      ],
    },
    {
      category: 'shader',
      hasVideo: false,
      image: '',
      title: { en: 'Holographic Projection Material', zh: '全息投影材质' },
      desc:  {
        en: 'Custom HLSL shader with scanlines, Fresnel rim lighting, and holographic interference noise.',
        zh: '自定义 HLSL 着色器，实现扫描线、菲涅尔边缘光与全息干扰噪波叠加效果。',
      },
      tags: ['Shader', 'HLSL'],
      links: [
        { label: { en: 'View Details →', zh: '查看详情 →' }, href: '#' },
        { label: { en: 'GitHub', zh: 'GitHub' }, href: '#' },
      ],
    },
    {
      category: 'code',
      hasVideo: false,
      image: '',
      title: { en: 'Procedural Terrain Generator', zh: '程序化地形生成器' },
      desc:  {
        en: 'Houdini Python SOP node generating tunable game terrains from multi-fractal noise.',
        zh: 'Houdini Python SOP 节点，基于多重分形噪波生成可参数化调节的游戏地形。',
      },
      tags: ['Code', 'Houdini', 'Python'],
      links: [
        { label: { en: 'View Code →', zh: '查看代码 →' }, href: '#' },
        { label: { en: 'GitHub', zh: 'GitHub' }, href: '#' },
      ],
    },
  ],


  /* ============================================================
     § 5. 简历 — 教育经历
     ============================================================ */

  education: [
    {
      school: { en: 'Shanghai University', zh: '上海大学' },
      period: { en: 'Sep 2019 — Aug 2023', zh: '2019.09 — 2023.08' },
      degree: { en: 'Bachelor of Fine Arts (Broadcasting and Television Playwright-director)',
                zh: '艺术学学士（广播电视编导）' },
      detail: {
        en: '<strong>Core Courses:</strong> Image Technology and Art, Visual Plastic Arts, Film and Video Shoot, Film and Video Editor, Analysis on Audio-visual Element, New Digital Media Foundation and Application.',
        zh: '<strong>核心课程：</strong>影像技术与艺术、视觉造型艺术、影视摄制、影视剪辑、视听元素分析、新数字媒体基础与应用、影视音乐、新媒体影像、演播室制作。',
      },
      award: { en: '', zh: '' },
    },
    {
      school: { en: 'Shanghai Vancouver Film School', zh: '上海温哥华电影学院' },
      period: { en: 'Sep 2021 — Aug 2022', zh: '2021.09 — 2022.08' },
      degree: { en: 'Game Design',
                zh: '游戏设计' },
      detail: {
        en: '<strong>Core Courses:</strong> Game Mechanics, Level Design, Art Fundamentals, Game Art, Unity C#, Unreal, 3D Modeling, Procedure Materials, Programming.',
        zh: '<strong>核心课程：</strong>游戏机制、关卡设计、艺术基础、游戏美术、Unity C#、虚幻引擎、3D 建模、程序化材质、编程、关卡设计。',
      },
      award: { en: '<span class="text-pink">Awards:</span> Full Scholarship to 2021 Talent SHVFS Game Design', zh: '<span class="text-pink">奖项：</span>2021 年度 SHVFS 游戏设计才能奖全额奖学金' },
    },
  ],


  /* ============================================================
     § 6. 简历 — 工作经历
     ============================================================ */

  workExp: [
    {
      company:    { en: 'Tencent', zh: '腾讯' },
      period:     { en: 'Dec 2025 — Now', zh: '2025.12 — 至今' },
      role:       { en: '(Intern) Technical Artist for Golden Spatula (Teamfight Tactics China Edition)',
                    zh: '（实习）技术美术师 — 金铲铲之战（自走棋中国版）' },
      projectUrl: '',
      bullets: [
        {
          en: '<strong>Custom Shader Development:</strong> Designed and implemented custom shaders in Unity using HLSL/CG and ASE for VFX and PBR environment assets.',
          zh: '<strong>自定义 Shader 开发：</strong>使用 HLSL/CG 和 ASE 在 Unity 中设计并实现用于 VFX 和 PBR 环境资产的自定义着色器。',
        },
        {
          en: '<strong>AI Pipeline & Automated Testing:</strong> Engineered a multi-agent collaborative workflow to automate Python-based TA tool generation.',
          zh: '<strong>AI 流水线与自动化测试：</strong>构建多智能体协作工作流，通过 MCP 实现 Python TA 工具的自动生成、测试与验证。',
        },
        {
          en: '<strong>AI-to-Character Animation Pipeline:</strong> Architected an end-to-end pipeline from AI video generation to project-ready character animation; increased production efficiency by 80%.',
          zh: '<strong>AI 转角色动画流水线：</strong>构建从 AI 视频生成到可用角色动画的端到端流水线，自研重定向工具集，生产效率提升 80%。',
        },
      ],
    },
    {
      company:    { en: 'Perfect World-Hotta Studio', zh: '完美世界-幻塔子公司' },
      period:     { en: 'May 2024 — Oct 2025', zh: '2024.05 — 2025.10' },
      role:       { en: 'Level Designer for Tower Of Fantasy (UE4 Open-world MMORPG)',
                    zh: '关卡设计师 — 幻塔（UE4 开放世界 MMORPG）' },
      projectUrl: 'https://www.youtube.com/watch?v=5CtQmstePSU',
      bullets: [
        {
          en: '<strong>Tool Design & Development:</strong> Engineered proprietary level editing tools for open-world mass production, reducing manual labor by 30%.',
          zh: '<strong>工具设计与开发：</strong>为开放世界大规模制作开发专有关卡编辑工具，减少人工操作 30%。',
        },
        {
          en: '<strong>UE4 Blueprint Development:</strong> Independently managed the full lifecycle of 19 open-world exploration gameplay features across versions 4.2-5.4.',
          zh: '<strong>UE4 蓝图开发：</strong>独立完整管理 4.2–5.4 版本共 19 个开放世界探索玩法功能全生命周期。',
        },
        {
          en: '<strong>Gameplay Framework Design:</strong> Designed scalable gameplay infrastructure including core data assets (DA) and data tables (DT).',
          zh: '<strong>玩法框架设计：</strong>设计可扩展的玩法基础架构，包含核心数据资产（DA）与数据表（DT）。',
        },
        {
          en: '<strong>Art Asset Design & Integration:</strong> Designed gameplay visuals (models, animations, VFX, interaction logic) and independently integrated art assets.',
          zh: '<strong>美术资产设计与集成：</strong>设计玩法视觉（模型、动画、VFX、交互逻辑）并独立完成美术资产集成。',
        },
        {
          en: '<strong>Cross-Team Collaboration:</strong> Collaborated with Art and Engineering to optimize performance (LOD, texture compression) to maintain target frame rates.',
          zh: '<strong>跨团队协作：</strong>与美术和工程团队协作进行性能优化（LOD、贴图压缩），维持目标帧率。',
        },
      ],
    },
    {
      company:    { en: 'NeoCast', zh: '上海辛卡司' },
      period:     { en: 'Mar 2024 — May 2024', zh: '2024.03 — 2024.05' },
      role:       { en: 'Technical Artist for Nezha (AR Interactive Mini-game)',
                    zh: '技术美术师 — 哪吒（AR 互动小游戏）' },
      projectUrl: '',
      bullets: [
        {
          en: '<strong>Environment Art:</strong> Crafted stationary 360° panoramic environments for AR glasses.',
          zh: '<strong>环境美术：</strong>为 AR 眼镜制作固定式 360° 全景环境，专注场景建模与优化后处理。',
        },
        {
          en: '<strong>Performance Optimization:</strong> Conducted profiling analysis; collaborated with Rokid\'s technical team for stable frame rates.',
          zh: '<strong>性能优化：</strong>进行 Profiling 分析定位瓶颈，与 Rokid 技术团队协作确保稳定帧率。',
        },
        {
          en: '<strong>Shader Development:</strong> Developed custom shader solutions utilizing ASE, CG, and HLSL for stylized rendering.',
          zh: '<strong>Shader 开发：</strong>使用 ASE、CG 和 HLSL 开发风格化渲染的自定义着色器方案。',
        },
      ],
    },
    {
      company:    { en: 'Neckom Games', zh: '铃空游戏' },
      period:     { en: 'Dec 2023 — Feb 2024', zh: '2023.12 — 2024.02' },
      role:       { en: 'Level Designer for Showa American Story (ARPG)',
                    zh: '关卡设计师 — 昭和米国物语（ARPG）' },
      projectUrl: '',
      bullets: [
        {
          en: '<strong>Level Creation:</strong> Made 2D layouts of levels, designed special mechanics and architectures to make white box.',
          zh: '<strong>关卡制作：</strong>制作关卡 2D 布局图，设计特殊机制与建筑，完成白盒搭建。',
        },
      ],
    },
    {
      company:    { en: 'Bug Inventor (Tencent)', zh: '腾云摘星' },
      period:     { en: 'Dec 2022 — Feb 2023', zh: '2022.12 — 2023.02' },
      role:       { en: 'Intern Level Designer for Screaming Chicken',
                    zh: '（实习）关卡设计师 — 尖叫鸡' },
      projectUrl: 'https://www.youtube.com/watch?v=jxHt0R11O-o',
      bullets: [
        {
          en: '<strong>Level Creation:</strong> Built 4 original multiplayer brawl maps (FFA/2v2) to support seasonal content goals.',
          zh: '<strong>关卡制作：</strong>制作 4 张原创多人混战地图（FFA/2v2），支持赛季内容目标。',
        },
        {
          en: '<strong>Production & Maintenance:</strong> Led playtesting cycles, revised levels based on feedback, and managed full deployment pipeline.',
          zh: '<strong>生产与维护：</strong>主导测试周期，根据反馈修改关卡，管理完整发布流程。',
        },
        {
          en: '<strong>Cross-Team Collaboration:</strong> Partnered with production and operations to align level design with live-ops strategy.',
          zh: '<strong>跨团队协作：</strong>与制作和运营团队合作，使关卡设计与运营策略保持一致。',
        },
      ],
    },
  ],


  /* ============================================================
     § 7. 简历 — 独立项目经历
     ============================================================ */

  indieProjects: [
    {
      title:      'Inside The Paper',
      period:     { en: 'Jun 2023 — Aug 2023', zh: '2023.06 — 2023.08' },
      role:       { en: 'Technical Artist (3D Stylized Puzzle Game)',
                    zh: '技术美术师（3D 风格化解谜游戏）' },
      projectUrl: 'https://www.youtube.com/watch?v=mVqrnLEID94',
      award:      { en: '', zh: '' },
      bullets: [
        {
          en: '<strong>Environment Art:</strong> Built level whiteboxes in Unity; crafted scene ambiance through particle effects and post-processing; created Low Poly models in Maya.',
          zh: '<strong>环境美术：</strong>在 Unity 中按概念图搭建关卡白盒，通过粒子特效和后处理营造场景氛围；在 Maya 中制作低多边形模型。',
        },
        {
          en: '<strong>Shader Development:</strong> Independently developed a streamlined cartoon graffiti-style shader to match the game\'s artistic vision.',
          zh: '<strong>Shader 开发：</strong>独立开发符合游戏美术风格的简化卡通涂鸦风着色器，并完成集成保证视觉统一。',
        },
      ],
    },
    {
      title:      'Lycoris',
      period:     { en: 'May 2022 — Aug 2022', zh: '2022.05 — 2022.08' },
      role:       { en: 'Technical Artist (3D Puzzle Platformer)',
                    zh: '技术美术师（3D 解谜平台跳跃游戏）' },
      projectUrl: 'https://www.youtube.com/watch?v=kVGB4noxZYs',
      award:      { en: 'Won the Outstanding Future Game Production Team Award (9th Golden Mouth Awards)', zh: '荣获第九届金口奖"杰出未来游戏制作团队"奖' },
      bullets: [
        {
          en: '<strong>3D Art:</strong> Crafted 3D character and environment assets; developed custom VFX for puzzle feedback loops.',
          zh: '<strong>3D 美术：</strong>制作 3D 角色与环境资产；为解谜反馈循环开发自定义 VFX。',
        },
        {
          en: '<strong>Shaders:</strong> Designed custom shaders in Unity URP for character gameplay and core puzzle mechanics.',
          zh: '<strong>Shader：</strong>在 Unity URP 中为角色玩法、环境美术和核心解谜机制设计自定义着色器。',
        },
        {
          en: '<strong>Project Planning:</strong> Led timeline planning by breaking down technical pipelines into manageable sprints.',
          zh: '<strong>项目规划：</strong>主导项目时间线规划，将技术流水线拆解为可管理的冲刺任务。',
        },
        {
          en: '<strong>Cross-Team Collaboration:</strong> Coordinated with designers and programmers to resolve asset integration issues.',
          zh: '<strong>跨团队协作：</strong>与设计师协调使技术资产与逻辑对齐；与程序员协作解决资产集成问题。',
        },
      ],
    },
    {
      title:      'Behind Me',
      period:     { en: 'Mar 2022 — May 2022', zh: '2022.03 — 2022.05' },
      role:       { en: 'Lead Designer (VR Horror Game)',
                    zh: '主设计师（VR 恐怖游戏）' },
      projectUrl: 'https://www.youtube.com/watch?v=eIB4k4AAeCE',
      award:      { en: '', zh: '' },
      bullets: [
        {
          en: '<strong>Game Design Documentation:</strong> Developed a comprehensive GDD centered on immersive horror VR experience.',
          zh: '<strong>游戏设计文档：</strong>围绕沉浸式恐怖 VR 体验制作完整 GDD，定义循环、交互逻辑和叙事元素。',
        },
        {
          en: '<strong>Level Design:</strong> Created modular level whitebox environments in Unity ensuring tension-rich progression.',
          zh: '<strong>关卡设计：</strong>在 Unity 中创建模块化白盒关卡环境，确保流畅且充满紧张感的游戏推进。',
        },
        {
          en: '<strong>Visual Design & Shaders:</strong> Designed high-impact enemy visuals and implemented custom horror-themed shaders.',
          zh: '<strong>视觉设计与 Shader：</strong>设计高冲击力的敌人外观，并实现自定义恐怖主题着色器。',
        },
        {
          en: '<strong>Enemy AI Programming:</strong> Programmed enemy AI behaviors (detection, pursuit, ambush) in Unity C#.',
          zh: '<strong>敌人 AI 编程：</strong>在 Unity C# 中编程实现敌人 AI 行为（探测、追击、伏击）。',
        },
      ],
    },
  ],

};  // ← CONFIG 结束，不要删除这个括号
