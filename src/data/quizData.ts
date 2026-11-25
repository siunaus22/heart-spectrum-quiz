export type DimensionKey = 'directness' | 'possessiveness' | 'slowBurn' | 'pureLove';

export type DimensionScores = Record<DimensionKey, number>;

export type SymbolType =
  | 'sakura-ring'
  | 'tsundere-ribbon'
  | 'kaguya-letter'
  | 'sunny-star'
  | 'cat-teacup'
  | 'bocchi-pick'
  | 'knight-brooch'
  | 'anya-peanut'
  | 'clover-note';

export interface QuizOption {
  id: string;
  label: string;
  subtext: string;
  deltas: Partial<DimensionScores>;
  /** 偏向加成标签，用于细分相同维度下的二次元人格 */
  archetypeBoost?: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  sceneTag: string;
  prompt: string;
  options: QuizOption[];
}

export interface IngredientItem {
  name: string;
  percent: number;
  color: string;
}

export interface LoveArchetype {
  id: string;
  title: string;
  badge: string;
  characters: string;
  animeSource: string;
  symbol: SymbolType;
  themeColor: string;
  accentBg: string;
  tagline: string;
  description: string;
  /** 理想四维画像 (0-100) 用于计算匹配度 */
  idealProfile: DimensionScores;
  /** 成分表模板 */
  ingredients: IngredientItem[];
  /** 3条真实细节攻略指南 */
  strategyGuide: [string, string, string];
  /** 宿命 CP 推荐 */
  destinedCp: {
    typeId: string;
    typeName: string;
    reason: string;
  };
}

export const DIMENSION_LABELS: Record<
  DimensionKey,
  { name: string; lowLabel: string; highLabel: string; color: string }
> = {
  directness: {
    name: '直球度',
    lowLabel: '委婉试探',
    highLabel: '坦率打直球',
    color: '#F28BA8',
  },
  possessiveness: {
    name: '占有欲',
    lowLabel: '佛系随缘',
    highLabel: '独占偏爱',
    color: '#A78BFA',
  },
  slowBurn: {
    name: '慢热指数',
    lowLabel: '一眼心动',
    highLabel: '日久生情',
    color: '#7CB5D9',
  },
  pureLove: {
    name: '纯爱倾向',
    lowLabel: '虐恋/乐子',
    highLabel: '至死不渝',
    color: '#F4A261',
  },
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    sceneTag: '深夜手机屏幕亮起',
    prompt: '喜欢的人突然秒回了你一条很长、甚至带了好几个表情包的消息，你的第一反应是？',
    options: [
      {
        id: '1a',
        label: '嘴角压不住了，立刻切回输入法逐句认真回复！',
        subtext: '快乐藏不住，恨不得把此刻的心跳打包发过去',
        deltas: { directness: 18, slowBurn: -12, pureLove: 12 },
        archetypeBoost: { 'sunny-puppy': 2, 'pure-warrior': 2 },
      },
      {
        id: '1b',
        label: '假装冷静地等个两三分钟再回，其实已经截图反复看了三遍',
        subtext: '表面波澜不惊，内心小人已经开始放烟花',
        deltas: { directness: -14, slowBurn: 10, pureLove: 10 },
        archetypeBoost: { 'calm-inside-you': 3, 'tsundere': 2 },
      },
      {
        id: '1c',
        label: '“Ta是不是对谁都这么热情？”先开启十分钟脑内推理剧场',
        subtext: '甚至开始纠结最后那个句号是不是代表敷衍',
        deltas: { directness: -16, slowBurn: 16, possessiveness: 8 },
        archetypeBoost: { 'mind-theater': 3, 'cool-cat': 1 },
      },
      {
        id: '1d',
        label: '回一个抽象表情包试探一下，顺便接个烂梗',
        subtext: '只要我先搞笑，暧昧的尴尬就追不上我',
        deltas: { directness: 6, pureLove: -10, slowBurn: -4 },
        archetypeBoost: { 'meme-lover': 3 },
      },
    ],
  },
  {
    id: 2,
    sceneTag: '放学/下班后的突发阵雨',
    prompt: '雨天你们刚好同路，但包里只有你的一把折叠伞，你会怎么做？',
    options: [
      {
        id: '2a',
        label: '“走吧！”直接把伞往对方那边倾一大半，自己半边肩膀淋湿也无所谓',
        subtext: '下意识的偏爱，连自己都没察觉有多明显',
        deltas: { directness: 14, pureLove: 18, possessiveness: 8 },
        archetypeBoost: { 'pure-warrior': 3, 'knight-guardian': 2 },
      },
      {
        id: '2b',
        label: '“勉强让你蹭一下好了，别靠太近啊”嘴上嫌弃但还是放慢了脚步',
        subtext: '耳朵尖悄悄红了，视线死死盯着前方路面',
        deltas: { directness: -10, pureLove: 12, slowBurn: 8 },
        archetypeBoost: { 'tsundere': 3 },
      },
      {
        id: '2c',
        label: '把伞塞给对方，自己找借口去旁边便利店躲雨或买另一把',
        subtext: '不想给对方添麻烦，也不敢太靠近那份心动',
        deltas: { directness: -12, slowBurn: 16, pureLove: 8 },
        archetypeBoost: { 'knight-guardian': 2, 'gentle-healer': 2, 'mind-theater': 1 },
      },
      {
        id: '2d',
        label: '“趁现在，我们来拍一张雨中合照吧！”顺便吐槽今天天气预报真不准',
        subtext: '把狼狈的雨天变成限定纪念日',
        deltas: { directness: 16, slowBurn: -12, pureLove: 4 },
        archetypeBoost: { 'sunny-puppy': 2, 'meme-lover': 2 },
      },
    ],
  },
  {
    id: 3,
    sceneTag: '聚会或课间的角落',
    prompt: '你看见对方正在和另一个异性聊得很开心，甚至笑出了声，此时你的内心OS是？',
    options: [
      {
        id: '3a',
        label: '表面继续低头喝奶茶，实则雷达全开，恨不得过去宣示“这是我的人”',
        subtext: '醋坛子已经翻了，但还要维持最后的体面',
        deltas: { possessiveness: 20, directness: -8, pureLove: 8 },
        archetypeBoost: { 'calm-inside-you': 3, 'tsundere': 2 },
      },
      {
        id: '3b',
        label: '直接走过去自然地插话或递一瓶水：“聊什么呢这么开心，带我一个？”',
        subtext: '与其在原地内耗，不如光明正大加入战场',
        deltas: { directness: 16, possessiveness: 14, slowBurn: -10 },
        archetypeBoost: { 'sunny-puppy': 2, 'pure-warrior': 2 },
      },
      {
        id: '3c',
        label: '默默把视线移开，心里有点酸酸的，开始反思自己是不是不够有趣',
        subtext: '越喜欢就越容易退缩，独自消化所有情绪',
        deltas: { directness: -16, slowBurn: 14, possessiveness: 6 },
        archetypeBoost: { 'mind-theater': 3, 'cool-cat': 2 },
      },
      {
        id: '3d',
        label: '“哦豁，有情况？”一边吃瓜一边观察，只要没越界就完全信任对方',
        subtext: '信任感拉满，或者单纯神经比较大条',
        deltas: { possessiveness: -16, pureLove: 6, directness: 4 },
        archetypeBoost: { 'meme-lover': 2, 'gentle-healer': 2 },
      },
    ],
  },
  {
    id: 4,
    sceneTag: '午夜十二点的对话框',
    prompt: '睡前突然收到对方发来的一句“在干嘛，还没睡吗？”，你会怎么接？',
    options: [
      {
        id: '4a',
        label: '“刚准备睡，但如果是你的话随时都有空！”',
        subtext: '秒答且直球，生怕对方下一秒就去睡了',
        deltas: { directness: 18, pureLove: 12, slowBurn: -10 },
        archetypeBoost: { 'sunny-puppy': 3, 'pure-warrior': 2 },
      },
      {
        id: '4b',
        label: '“还没，怎么了？”（其实心里已经脑补了一万字深夜谈心剧本）',
        subtext: '极简的文字背后是狂跳的心率',
        deltas: { directness: -12, slowBurn: 12, possessiveness: 6 },
        archetypeBoost: { 'calm-inside-you': 3, 'cool-cat': 2 },
      },
      {
        id: '4c',
        label: '先打一段长长的关心话，写完觉得太热情又删掉，最后只发了个晚安表情',
        subtext: '编辑框里的“正在输入中”亮了又灭',
        deltas: { directness: -18, slowBurn: 16, pureLove: 10 },
        archetypeBoost: { 'mind-theater': 3, 'gentle-healer': 1 },
      },
      {
        id: '4d',
        label: '“在修仙，速来联机 / 给你看个好笑的视频”',
        subtext: '把深夜心动局硬生生处成快乐兄弟局',
        deltas: { directness: 8, pureLove: -12, slowBurn: -6 },
        archetypeBoost: { 'meme-lover': 3 },
      },
    ],
  },
  {
    id: 5,
    sceneTag: '随口一提的小细节',
    prompt: '你曾经随口说过一次自己喜欢吃某种冷门零食，几天后对方真的买来递给你，你会？',
    options: [
      {
        id: '5a',
        label: '眼睛瞬间亮起来，当场开心到转圈：“你也太好了吧！我超喜欢！”',
        subtext: '真诚永远是必杀技，情绪价值直接拉满',
        deltas: { directness: 16, pureLove: 14, slowBurn: -8 },
        archetypeBoost: { 'sunny-puppy': 3, 'gentle-healer': 2 },
      },
      {
        id: '5b',
        label: '心里感动得要命，嘴上却说“谢了，下次请你喝奶茶当回礼”，然后把包装纸都留着',
        subtext: '所有温柔都被偷偷珍藏在手账本里',
        deltas: { pureLove: 18, slowBurn: 10, directness: -6 },
        archetypeBoost: { 'pure-warrior': 2, 'knight-guardian': 3 },
      },
      {
        id: '5c',
        label: '“你干嘛突然记这个啊……”耳朵发烫，嘴硬掩饰自己的心动',
        subtext: '被偏爱击中后反而有点手足无措',
        deltas: { directness: -10, pureLove: 12, possessiveness: 6 },
        archetypeBoost: { 'tsundere': 3, 'cool-cat': 1 },
      },
      {
        id: '5d',
        label: '一边狂炫一边感慨：“这就是被投喂的快乐吗，义父请受我一拜！”',
        subtext: '用抽象掩饰感动是二次元的传统艺能',
        deltas: { pureLove: -8, directness: 8, slowBurn: -8 },
        archetypeBoost: { 'meme-lover': 3 },
      },
    ],
  },
  {
    id: 6,
    sceneTag: '周末约会/漫展人潮',
    prompt: '人山人海的街口，你们不小心被人群挤散了一点距离，你会？',
    options: [
      {
        id: '6a',
        label: '毫不犹豫伸手拉住对方的袖口或手腕：“抓紧我，别走丢了。”',
        subtext: '关键时刻绝不退缩，安全感直接拉满',
        deltas: { directness: 16, possessiveness: 16, pureLove: 12 },
        archetypeBoost: { 'pure-warrior': 3, 'knight-guardian': 3 },
      },
      {
        id: '6b',
        label: '站定在原地张望，等对方回头找自己，再轻轻牵住衣角',
        subtext: '矜持又依赖，想确认对方也会第一时间回头',
        deltas: { directness: -8, slowBurn: 10, possessiveness: 10 },
        archetypeBoost: { 'cool-cat': 2, 'calm-inside-you': 2 },
      },
      {
        id: '6c',
        label: '立刻打电话/发定位，顺便举起手里的应援棒或奶茶当信号塔',
        subtext: '行动派小太阳，丢不了的！',
        deltas: { directness: 14, slowBurn: -10, possessiveness: 4 },
        archetypeBoost: { 'sunny-puppy': 2, 'meme-lover': 2 },
      },
      {
        id: '6d',
        label: '慌乱一秒后赶紧跟上，心里狂念“千万别被讨厌我太粘人”',
        subtext: '连走丢都在小心翼翼顾及对方的感受',
        deltas: { directness: -14, slowBurn: 14, pureLove: 8 },
        archetypeBoost: { 'mind-theater': 2, 'gentle-healer': 2 },
      },
    ],
  },
  {
    id: 7,
    sceneTag: '关于“喜欢”的确认速度',
    prompt: '回想你过往心动的瞬间，你通常是怎么爱上一个人的？',
    options: [
      {
        id: '7a',
        label: '某个瞬间眼神对上、阳光刚好落在对方身上，我就知道完蛋了',
        subtext: '一见钟情型，心动信号来得像夏夜烟花',
        deltas: { slowBurn: -20, directness: 12, pureLove: 10 },
        archetypeBoost: { 'sunny-puppy': 2, 'pure-warrior': 2 },
      },
      {
        id: '7b',
        label: '需要很久的观察与相处，确认对方温柔且值得托付后才敢慢慢交出真心',
        subtext: '慢热但长情，一旦认定就不会轻易动摇',
        deltas: { slowBurn: 22, pureLove: 14, possessiveness: 6 },
        archetypeBoost: { 'cool-cat': 3, 'knight-guardian': 2 },
      },
      {
        id: '7c',
        label: '起初只是觉得对方很有趣或有点笨，结果斗嘴着斗嘴着就真香了',
        subtext: '欢喜冤家剧本，嘴上不饶人心里全是你',
        deltas: { slowBurn: 8, directness: -6, pureLove: 6 },
        archetypeBoost: { 'tsundere': 3, 'meme-lover': 1 },
      },
      {
        id: '7d',
        label: '在对方的温柔治愈下，不知不觉把所有的安全感都系在了对方身上',
        subtext: '细水长流的陪伴才是最致命的浪漫',
        deltas: { slowBurn: 14, pureLove: 16, possessiveness: 8 },
        archetypeBoost: { 'gentle-healer': 3, 'calm-inside-you': 2 },
      },
    ],
  },
  {
    id: 8,
    sceneTag: '对方突然换了神秘头像',
    prompt: '你发现对方突然换了一个从没见过的二次元情侣/氛围感头像，签名也改成了看不懂的歌词，你会？',
    options: [
      {
        id: '8a',
        label: '直接私聊截图问：“新头像挺好看啊，有故事？”',
        subtext: '与其自己猜到失眠，不如直接敲门问清楚',
        deltas: { directness: 18, possessiveness: 10, slowBurn: -8 },
        archetypeBoost: { 'sunny-puppy': 2, 'tsundere': 1 },
      },
      {
        id: '8b',
        label: '默默搜遍这句歌词的出处、头像的原图作者，甚至连夜排查是不是另一半的号',
        subtext: '恋爱中的每个人都是顶尖赛博侦探',
        deltas: { possessiveness: 18, directness: -14, slowBurn: 10 },
        archetypeBoost: { 'calm-inside-you': 3, 'mind-theater': 2 },
      },
      {
        id: '8c',
        label: '虽然很在意，但还是忍住没问，怕显得自己管得太宽',
        subtext: '克制是我的保护色，哪怕心里已经翻江倒海',
        deltas: { directness: -12, slowBurn: 14, possessiveness: 4 },
        archetypeBoost: { 'knight-guardian': 2, 'cool-cat': 2 },
      },
      {
        id: '8d',
        label: '“好家伙，中二病犯了？”顺手也换个沙雕头像去评论区凑热闹',
        subtext: '永远保持松弛感，快乐最重要',
        deltas: { possessiveness: -12, pureLove: -10, directness: 8 },
        archetypeBoost: { 'meme-lover': 3 },
      },
    ],
  },
  {
    id: 9,
    sceneTag: '关系里的底线与偏爱',
    prompt: '如果你们已经是恋人关系，你最希望对方为你做到哪一件事？',
    options: [
      {
        id: '9a',
        label: '坚定的“唯一偏爱”——在所有选择里，永远把我排在第一位',
        subtext: '纯爱战神的终极浪漫：我的世界里只有你',
        deltas: { pureLove: 20, possessiveness: 16, directness: 6 },
        archetypeBoost: { 'pure-warrior': 3, 'calm-inside-you': 1 },
      },
      {
        id: '9b',
        label: '能接住我所有奇奇怪怪的脑洞和情绪，不用说话也能懂彼此的默契',
        subtext: '灵魂同频比甜言蜜语更让人心动',
        deltas: { slowBurn: 10, pureLove: 12, possessiveness: -4 },
        archetypeBoost: { 'gentle-healer': 3, 'mind-theater': 2 },
      },
      {
        id: '9c',
        label: '保留一点恰到好处的独立空间，但需要依靠时对方永远都在',
        subtext: '像猫一样，既自由又眷恋你的怀抱',
        deltas: { slowBurn: 14, possessiveness: -10, directness: -4 },
        archetypeBoost: { 'cool-cat': 3, 'knight-guardian': 2 },
      },
      {
        id: '9d',
        label: '每天都能一起哈哈大笑，把平淡的日子过成搞笑日常番',
        subtext: '快乐番剧永不完结就是最好的恋爱',
        deltas: { pureLove: -8, slowBurn: -12, directness: 12 },
        archetypeBoost: { 'sunny-puppy': 2, 'meme-lover': 3 },
      },
    ],
  },
  {
    id: 10,
    sceneTag: '属于你们的番剧结局',
    prompt: '最后一道题：如果把你理想中的恋爱拍成一部 12 集新番，你最想看到怎样的名场面？',
    options: [
      {
        id: '10a',
        label: '黄昏电车站前，跨越人海奔向彼此，大声喊出“我就是喜欢你！”',
        subtext: '直球且炽热，哪怕世界末日也要在一起',
        deltas: { directness: 18, pureLove: 18, slowBurn: -10 },
        archetypeBoost: { 'pure-warrior': 3, 'sunny-puppy': 2 },
      },
      {
        id: '10b',
        label: '烟火大会的夜空下，两人嘴上还在斗嘴，手却悄悄十指相扣',
        subtext: '最经典的傲娇与隐秘心动时刻',
        deltas: { directness: -8, pureLove: 12, possessiveness: 8 },
        archetypeBoost: { 'tsundere': 3, 'calm-inside-you': 2 },
      },
      {
        id: '10c',
        label: '漫长风雪过后，在温暖的小屋里互相写信、泡茶，守护彼此的余生',
        subtext: '克制而深沉，时间会证明一切',
        deltas: { slowBurn: 16, pureLove: 16, directness: -6 },
        archetypeBoost: { 'knight-guardian': 3, 'gentle-healer': 2 },
      },
      {
        id: '10d',
        label: '大结局居然是两人为了抢最后一块炸鸡打起来，弹幕全在刷“kswl”',
        subtext: '沙雕与甜度齐飞，这才是真实又可爱的恋爱',
        deltas: { pureLove: -12, directness: 10, slowBurn: -8 },
        archetypeBoost: { 'meme-lover': 3 },
      },
    ],
  },
];

export const ARCHETYPES: LoveArchetype[] = [
  {
    id: 'pure-warrior',
    title: '纯爱战神型',
    badge: 'Pure Love Paladin',
    characters: '乙骨忧太 / 宫水三叶',
    animeSource: '《咒术回战 0》·《你的名字。》',
    symbol: 'sakura-ring',
    themeColor: '#E57A9E',
    accentBg: '#FFF0F5',
    tagline: '“这可是纯爱啊！一旦认定，连时间与命运都无法把我们分开。”',
    description:
      '你是二次元世界里最坚定的纯爱信仰者。平时或许温柔礼貌，但只要关乎喜欢的人，就会爆发出惊人的勇气与偏爱。你不屑于海王式的拉扯，要的是一份能写进手账最后一页、跨越山海也要奔赴的唯一宿命。',
    idealProfile: { directness: 76, possessiveness: 78, slowBurn: 36, pureLove: 95 },
    ingredients: [
      { name: '纯爱脑', percent: 48, color: '#F28BA8' },
      { name: '专一偏爱', percent: 26, color: '#A78BFA' },
      { name: '宿命感滤镜', percent: 16, color: '#7CB5D9' },
      { name: '护短本能', percent: 10, color: '#F4A261' },
    ],
    strategyGuide: [
      '比起华丽的套路，你在深夜发来的一句“刚才路过这里突然好想你”就能直接击穿Ta的防线。',
      '记住Ta随口提过的小愿望并悄悄实现，Ta会在心里把你直接封神。',
      '给足Ta“唯独你不一样”的安全感，Ta就会毫无保留地把整颗心交给你。',
    ],
    destinedCp: {
      typeId: 'knight-guardian',
      typeName: '克制守护骑士型',
      reason: '一个热烈奔赴、一个沉默托底，双向奔赴的纯爱浓度直接爆表，弹幕都要刷满“请原地结婚”！',
    },
  },
  {
    id: 'tsundere',
    title: '嘴硬心软傲娇型',
    badge: 'Tsundere Ribbon',
    characters: '远坂凛 / 牧濑红莉栖',
    animeSource: '《Fate/stay night》·《命运石之门》',
    symbol: 'tsundere-ribbon',
    themeColor: '#D96B8A',
    accentBg: '#FFF2F6',
    tagline: '“才、才不是特意为你准备的呢！只是刚好顺路而已！”',
    description:
      '你的真心总是包着一层薄薄的糖衣外壳。越是心动的时候，嘴上越容易反驳或装作不在意；可一旦对方遇到麻烦，第一个冲上去帮忙、熬夜做攻略的也是你。你的傲娇不是冷漠，而是害羞到极致的可爱防御机制。',
    idealProfile: { directness: 34, possessiveness: 66, slowBurn: 58, pureLove: 80 },
    ingredients: [
      { name: '口嫌体正直', percent: 42, color: '#F28BA8' },
      { name: '隐秘心软', percent: 28, color: '#F4A261' },
      { name: '胜负欲', percent: 18, color: '#A78BFA' },
      { name: '纯情红温', percent: 12, color: '#7CB5D9' },
    ],
    strategyGuide: [
      '别信Ta嘴上的“随便”和“才没有”，看Ta有没有偷偷记住你的习惯和喜好就够了。',
      '在Ta嘴硬反驳的时候顺毛摸头或笑着拆穿一句“谢谢”，Ta会瞬间红温缴械。',
      '偶尔直球夸奖Ta的努力与可爱，Ta表面嫌弃，回家能开心到在床上打滚。',
    ],
    destinedCp: {
      typeId: 'sunny-puppy',
      typeName: '直球阳光小狗型',
      reason: '阳光直球专门克制一切嘴硬傲娇！不管你筑起多高的心墙，小狗都能摇着尾巴一口气撞开。',
    },
  },
  {
    id: 'calm-inside-you',
    title: '表面淡定实则满脑子是你型',
    badge: 'Secret Heartbeat',
    characters: '安达樱 / 四宫辉夜',
    animeSource: '《安达与岛村》·《辉夜大小姐想让我告白》',
    symbol: 'kaguya-letter',
    themeColor: '#9C7AD6',
    accentBg: '#F6F1FC',
    tagline: '“表情管理满分 100 分，但心率监测仪已经报警了。”',
    description:
      '你在外人面前总是冷静自持、甚至有点小高冷，仿佛一切尽在掌握。但只有你自己知道，对方发来的一句普通问候，足以让你在脑内召开长达半小时的“恋爱头脑战”。你把所有的占有欲和深情都折叠进了安静的注视里。',
    idealProfile: { directness: 28, possessiveness: 84, slowBurn: 68, pureLove: 84 },
    ingredients: [
      { name: '内心弹幕刷屏', percent: 40, color: '#A78BFA' },
      { name: '隐形占有欲', percent: 26, color: '#F28BA8' },
      { name: '恋爱头脑战', percent: 20, color: '#7CB5D9' },
      { name: '克制体面', percent: 14, color: '#F4A261' },
    ],
    strategyGuide: [
      'Ta的沉默往往不是冷淡，而是在紧张地思考“怎么回才不会显得太主动”。',
      '主动打破一点点社交距离（比如递一颗糖、靠得近一点），Ta表面淡定实则cpu已烧干。',
      '多给Ta一点明确的偏爱信号，把“你猜我喜不喜欢你”变成“我只喜欢你”。',
    ],
    destinedCp: {
      typeId: 'cool-cat',
      typeName: '高冷慢热猫系型',
      reason: '两个都在暗中观察彼此的人一旦捅破窗户纸，那种只有彼此懂的隐秘默契甜度极高！',
    },
  },
  {
    id: 'sunny-puppy',
    title: '直球阳光小狗型',
    badge: 'Golden Retriever',
    characters: '喜多川海梦 / 锦木千束',
    animeSource: '《更衣人偶坠入爱河》·《莉可丽丝》',
    symbol: 'sunny-star',
    themeColor: '#EB9257',
    accentBg: '#FFF6EE',
    tagline: '“喜欢就要大声说出来呀！今天也是超级喜欢你的一天！”',
    description:
      '你就像盛夏正午的汽水与阳光，喜欢一个人时眼睛里简直要冒出小星星。你不喜欢猜来猜去的内耗，开心就笑、想见就约、被夸就害羞又坦率。跟你谈恋爱就像跌进柔软的棉花糖里，每天都能被炽热的爱意包裹。',
    idealProfile: { directness: 92, possessiveness: 55, slowBurn: 18, pureLove: 78 },
    ingredients: [
      { name: '坦率直球', percent: 45, color: '#F4A261' },
      { name: '高能量贴贴', percent: 25, color: '#F28BA8' },
      { name: '纯情直觉', percent: 18, color: '#7CB5D9' },
      { name: '一点点粘人', percent: 12, color: '#A78BFA' },
    ],
    strategyGuide: [
      '不要对Ta搞冷战或“已读不回”测试，小狗会真的以为自己做错了什么而委屈一整天。',
      '热烈回应Ta分享的每一件小事，哪怕只是路边看到的一只可爱小猫。',
      '摸摸头+直白地夸“有你在真好”，就能让Ta瞬间充满 200% 的电量。',
    ],
    destinedCp: {
      typeId: 'tsundere',
      typeName: '嘴硬心软傲娇型',
      reason: '你的无限直球与耐心，正好能接住傲娇怪所有的别扭和害羞，是B站公认的天选官配！',
    },
  },
  {
    id: 'cool-cat',
    title: '高冷慢热猫系型',
    badge: 'Velvet Cat',
    characters: '雪之下雪乃 / 岛村抱月',
    animeSource: '《我的青春恋爱物语果然有问题》·《安达与岛村》',
    symbol: 'cat-teacup',
    themeColor: '#679EC4',
    accentBg: '#EFF6FB',
    tagline: '“别靠太近……不过，如果你一直站在那里，我也不是不能走过去。”',
    description:
      '你自带一种清冷疏离的空气感，像一只坐在窗台晒太阳的猫。你很看重精神世界的同频与边界感，不会因为几句甜言蜜语就轻易交心。可一旦有人通过了你漫长的观察期，你会用最安静也最坚定的方式黏在对方身边。',
    idealProfile: { directness: 38, possessiveness: 42, slowBurn: 90, pureLove: 76 },
    ingredients: [
      { name: '慢热防线', percent: 40, color: '#7CB5D9' },
      { name: '独立清醒', percent: 28, color: '#A78BFA' },
      { name: '猫系撒娇', percent: 18, color: '#F28BA8' },
      { name: '长情执着', percent: 14, color: '#F4A261' },
    ],
    strategyGuide: [
      '切忌步步紧逼或查户口式追问，像喂流浪猫一样保持温柔稳定的频率靠近。',
      '尊重Ta独处充电的时间，等Ta自己凑过来蹭你的时候再顺势抱住。',
      '用细节和长期的陪伴证明你的真诚，慢热的人一旦动心就是一辈子。',
    ],
    destinedCp: {
      typeId: 'gentle-healer',
      typeName: '温柔共情治愈型',
      reason: '既能给足舒适的留白，又能敏锐接住你藏在冷淡背后的细腻情绪，相处起来毫不费力。',
    },
  },
  {
    id: 'mind-theater',
    title: '脑内剧场重度患者型',
    badge: 'Overthinking Club',
    characters: '后藤一里 / 石上优',
    animeSource: '《孤独摇滚！》·《辉夜大小姐想让我告白》',
    symbol: 'bocchi-pick',
    themeColor: '#E07BB5',
    accentBg: '#FDF0F8',
    tagline: '“Ta回了一个‘嗯’……完了，我是不是被讨厌了？我要钻进纸箱里了！”',
    description:
      '你的恋爱有一半是在现实里进行的，另一半是在自己的脑内小剧场演完的。从对方的一个眼神到聊天记录的标点符号，你都能延伸出八百字的情感分析。你其实极其真诚又敏感，只是太害怕受伤，才总是先在心里演练无数遍。',
    idealProfile: { directness: 20, possessiveness: 62, slowBurn: 80, pureLove: 82 },
    ingredients: [
      { name: '脑补小剧场', percent: 44, color: '#F28BA8' },
      { name: '社恐退堂鼓', percent: 24, color: '#7CB5D9' },
      { name: '细腻共情', percent: 18, color: '#A78BFA' },
      { name: '纯情真心', percent: 14, color: '#F4A261' },
    ],
    strategyGuide: [
      '发消息尽量别用单字“嗯”“哦”结尾，加个波浪号或表情包能拯救Ta一夜的睡眠。',
      '当Ta开始疯狂自我否定时，直接打断施法告诉Ta：“没有讨厌你，我最喜欢你了。”',
      '多带Ta去做具体的事（看电影、逛展、吃好吃的），别让Ta一个人胡思乱想。',
    ],
    destinedCp: {
      typeId: 'sunny-puppy',
      typeName: '直球阳光小狗型',
      reason: '小狗毫无阴霾的坦率能一键清空你脑海里的所有负能量弹幕，带你走出纸箱晒太阳！',
    },
  },
  {
    id: 'knight-guardian',
    title: '克制守护骑士型',
    badge: 'Silent Knight',
    characters: '薇尔莉特 / 利威尔',
    animeSource: '《紫罗兰永恒花园》·《进击的巨人》',
    symbol: 'knight-brooch',
    themeColor: '#6985B5',
    accentBg: '#EEF2F9',
    tagline: '“只要你需要，我永远站在你身后半步的地方。”',
    description:
      '你不擅长把“爱”挂在嘴边，却最懂得什么是沉甸甸的责任与守护。你习惯把脆弱藏起来，把最可靠、最温柔的一面留给在乎的人。对你而言，爱不是一时的心动烟花，而是在风雨来临时，永远替对方撑起的那片晴空。',
    idealProfile: { directness: 48, possessiveness: 64, slowBurn: 74, pureLove: 90 },
    ingredients: [
      { name: '行动派守护', percent: 42, color: '#7CB5D9' },
      { name: '深情克制', percent: 28, color: '#A78BFA' },
      { name: '责任感', percent: 20, color: '#F4A261' },
      { name: '隐秘温柔', percent: 10, color: '#F28BA8' },
    ],
    strategyGuide: [
      '别只享受Ta的照顾，记得问一句“你今天累不累”，Ta其实很渴望被心疼。',
      '强行把Ta手里的重物接过来一半，让这位习惯扛下一切的骑士也能偶尔依靠你。',
      '用正式而郑重的方式表达心意（比如一封手写信），Ta会铭记很多年。',
    ],
    destinedCp: {
      typeId: 'pure-warrior',
      typeName: '纯爱战神型',
      reason: '你们对感情有着同样极致的忠诚与纯度，一旦牵手就是能写进史诗里的双向守护。',
    },
  },
  {
    id: 'meme-lover',
    title: '抽象乐子人恋爱型',
    badge: 'Waku Waku Lover',
    characters: '阿尼亚 / 佐藤和真',
    animeSource: '《间谍过家家》·《为美好的世界献上祝福！》',
    symbol: 'anya-peanut',
    themeColor: '#E38B6B',
    accentBg: '#FFF4EF',
    tagline: '“谈恋爱哪有整活开心啊！……不过如果是你的话，勉强让你当我的二号玩家吧！”',
    description:
      '你自带弹幕护体，把严肃的暧昧气氛变成搞笑日常番是你的拿手好戏。比起苦情虐恋，你更看重两个人在一起“好不好玩、笑不笑得出来”。别被你满嘴骚话骗了，其实只要对方能接住你的抽象梗，你就会瞬间心动到“哇库哇库”。',
    idealProfile: { directness: 70, possessiveness: 28, slowBurn: 26, pureLove: 32 },
    ingredients: [
      { name: '抽象整活', percent: 44, color: '#F4A261' },
      { name: '松弛感', percent: 26, color: '#7CB5D9' },
      { name: '接梗默契', percent: 18, color: '#A78BFA' },
      { name: '嘴硬式喜欢', percent: 12, color: '#F28BA8' },
    ],
    strategyGuide: [
      '千万别一本正经地对Ta念土味情话，Ta只会笑着把你发到朋友圈当素材。',
      '接住Ta的每一次发癫并反手丢出一个更抽象的表情包，灵魂契合度瞬间 +10086。',
      '在闹完笑完之后的某个安静瞬间突然认真看Ta一眼，反差感直接绝杀。',
    ],
    destinedCp: {
      typeId: 'calm-inside-you',
      typeName: '表面淡定实则满脑子是你型',
      reason: '一个疯狂整活输出，一个表面高冷实则憋笑到内伤，日常互动简直比新番还精彩！',
    },
  },
  {
    id: 'gentle-healer',
    title: '温柔共情治愈型',
    badge: 'Clover Melody',
    characters: '本田透 / 宫园薰',
    animeSource: '《水果篮子》·《四月是你的谎言》',
    symbol: 'clover-note',
    themeColor: '#6EB59B',
    accentBg: '#EFF9F5',
    tagline: '“没关系的，不管世界怎么喧嚣，我这里永远为你留着一杯热茶。”',
    description:
      '你拥有极强的共情力与温柔底色，总能敏锐地察觉到别人没说出口的疲惫。你的爱像春天的微风，不刺眼却能悄无声息地融化所有坚冰。和你在一起的人会觉得自己被真正地看见、被稳稳地接住，连生活都变得柔软起来。',
    idealProfile: { directness: 52, possessiveness: 40, slowBurn: 64, pureLove: 86 },
    ingredients: [
      { name: '治愈共情', percent: 42, color: '#6EB59B' },
      { name: '温柔倾听', percent: 26, color: '#7CB5D9' },
      { name: '细水长流', percent: 20, color: '#F28BA8' },
      { name: '小迷糊', percent: 12, color: '#F4A261' },
    ],
    strategyGuide: [
      'Ta总是习惯先照顾别人的情绪，所以请你做那个主动偏爱Ta、保护Ta的人。',
      '认真听Ta倾诉那些不起眼的日常小烦恼，别急着讲道理，先给一个拥抱。',
      '带Ta去吃甜品、看樱花或散步，简单的生活仪式感就能让Ta幸福很久。',
    ],
    destinedCp: {
      typeId: 'cool-cat',
      typeName: '高冷慢热猫系型',
      reason: '你的温暖恰好能融化猫系恋人的防备，而猫系恋人独一无二的偏爱也会成为你的专属奖赏。',
    },
  },
];

function clamp(val: number, min = 5, max = 98): number {
  return Math.max(min, Math.min(max, Math.round(val)));
}

export interface DiagnosisResult {
  archetype: LoveArchetype;
  dimensions: DimensionScores;
  ingredients: IngredientItem[];
  heartRateBpm: number;
  matchScore: number;
}

export function calculateDiagnosis(answers: QuizOption[]): DiagnosisResult {
  const raw: DimensionScores = {
    directness: 50,
    possessiveness: 50,
    slowBurn: 50,
    pureLove: 55,
  };

  const boostCounts: Record<string, number> = {};

  for (const ans of answers) {
    raw.directness += ans.deltas.directness ?? 0;
    raw.possessiveness += ans.deltas.possessiveness ?? 0;
    raw.slowBurn += ans.deltas.slowBurn ?? 0;
    raw.pureLove += ans.deltas.pureLove ?? 0;

    if (ans.archetypeBoost) {
      for (const [key, val] of Object.entries(ans.archetypeBoost)) {
        boostCounts[key] = (boostCounts[key] ?? 0) + val;
      }
    }
  }

  const dimensions: DimensionScores = {
    directness: clamp(raw.directness),
    possessiveness: clamp(raw.possessiveness),
    slowBurn: clamp(raw.slowBurn),
    pureLove: clamp(raw.pureLove),
  };

  let bestArchetype = ARCHETYPES[0];
  let bestScore = -Infinity;

  for (const arch of ARCHETYPES) {
    const dist =
      Math.abs(dimensions.directness - arch.idealProfile.directness) +
      Math.abs(dimensions.possessiveness - arch.idealProfile.possessiveness) +
      Math.abs(dimensions.slowBurn - arch.idealProfile.slowBurn) +
      Math.abs(dimensions.pureLove - arch.idealProfile.pureLove);

    const boost = (boostCounts[arch.id] ?? 0) * 14;
    const score = 400 - dist + boost;

    if (score > bestScore) {
      bestScore = score;
      bestArchetype = arch;
    }
  }

  // 根据用户四维轻微个性化成分表百分比（总和保持100%）
  const baseIngredients = bestArchetype.ingredients;
  const tweaks = [
    Math.round((dimensions.pureLove - 55) * 0.08),
    Math.round((dimensions.possessiveness - 50) * 0.06),
    Math.round((dimensions.slowBurn - 50) * 0.05),
    0,
  ];
  const adjusted = baseIngredients.map((item, idx) =>
    Math.max(6, item.percent + (tweaks[idx] ?? 0))
  );
  const sum = adjusted.reduce((acc, n) => acc + n, 0);
  const normalized = adjusted.map((val) => Math.round((val / sum) * 100));
  const diff = 100 - normalized.reduce((a, b) => a + b, 0);
  normalized[0] += diff;

  const ingredients = baseIngredients.map((item, idx) => ({
    ...item,
    percent: normalized[idx],
  }));

  const heartRateBpm = Math.min(
    142,
    Math.max(
      76,
      Math.round(
        82 +
          dimensions.directness * 0.25 +
          dimensions.pureLove * 0.18 +
          (100 - dimensions.slowBurn) * 0.12
      )
    )
  );

  const matchScore = Math.min(99, Math.max(84, Math.round(86 + (boostCounts[bestArchetype.id] ?? 1) * 1.4)));

  return {
    archetype: bestArchetype,
    dimensions,
    ingredients,
    heartRateBpm,
    matchScore,
  };
}
