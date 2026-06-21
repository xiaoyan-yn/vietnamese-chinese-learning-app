import type { Lesson } from "@/types";

export const lessons: Lesson[] = [
  {
    id: "intro-greetings",
    titleVi: "Chao hoi",
    titleZh: "打招呼",
    level: "beginner",
    descriptionVi: "Hoc cach chao hoi, hoi tham va tam biet bang tieng Trung.",
    vocabulary: [
      { id: "hello", chinese: "你好", pinyin: "ni hao", vietnamese: "Xin chao" },
      { id: "thanks", chinese: "谢谢", pinyin: "xie xie", vietnamese: "Cam on" },
      { id: "bye", chinese: "再见", pinyin: "zai jian", vietnamese: "Tam biet" },
    ],
    sentences: [
      { id: "s1", chinese: "你好，你好吗？", pinyin: "ni hao, ni hao ma?", vietnamese: "Xin chao, ban khoe khong?" },
      { id: "s2", chinese: "我很好，谢谢。", pinyin: "wo hen hao, xie xie.", vietnamese: "Toi rat khoe, cam on." },
      { id: "s3", chinese: "明天见。", pinyin: "ming tian jian.", vietnamese: "Ngay mai gap lai." },
    ],
    dialogue: [
      { id: "d1", speakerVi: "A", chinese: "你好！", pinyin: "ni hao!", vietnamese: "Xin chao!" },
      { id: "d2", speakerVi: "B", chinese: "你好，你好吗？", pinyin: "ni hao, ni hao ma?", vietnamese: "Xin chao, ban khoe khong?" },
      { id: "d3", speakerVi: "A", chinese: "我很好，谢谢。", pinyin: "wo hen hao, xie xie.", vietnamese: "Toi rat khoe, cam on." },
    ],
    questions: [
      {
        id: "q1",
        type: "choice",
        promptVi: "Cau nao co nghia la 'Xin chao'?",
        options: ["你好", "谢谢", "再见"],
        answer: "你好",
        explanationVi: "你好 co nghia la Xin chao.",
      },
      {
        id: "q2",
        type: "blank",
        promptVi: "Dien tu con thieu: 我很好，____。",
        chinese: "我很好，____。",
        pinyin: "wo hen hao, ____.",
        answer: "谢谢",
        explanationVi: "谢谢 co nghia la cam on.",
      },
    ],
  },
  {
    id: "self-introduction",
    titleVi: "Tu gioi thieu",
    titleZh: "自我介绍",
    level: "beginner",
    descriptionVi: "Noi ten, quoc tich va nghe nghiep mot cach don gian.",
    vocabulary: [
      { id: "name", chinese: "名字", pinyin: "ming zi", vietnamese: "Ten" },
      { id: "vietnamese", chinese: "越南人", pinyin: "yue nan ren", vietnamese: "Nguoi Viet Nam" },
      { id: "student", chinese: "学生", pinyin: "xue sheng", vietnamese: "Hoc sinh / sinh vien" },
    ],
    sentences: [
      { id: "s1", chinese: "我叫安。", pinyin: "wo jiao An.", vietnamese: "Toi ten la An." },
      { id: "s2", chinese: "我是越南人。", pinyin: "wo shi yue nan ren.", vietnamese: "Toi la nguoi Viet Nam." },
      { id: "s3", chinese: "我是学生。", pinyin: "wo shi xue sheng.", vietnamese: "Toi la hoc sinh / sinh vien." },
    ],
    dialogue: [
      { id: "d1", speakerVi: "A", chinese: "你叫什么名字？", pinyin: "ni jiao shen me ming zi?", vietnamese: "Ban ten la gi?" },
      { id: "d2", speakerVi: "B", chinese: "我叫安。", pinyin: "wo jiao An.", vietnamese: "Toi ten la An." },
      { id: "d3", speakerVi: "A", chinese: "你是越南人吗？", pinyin: "ni shi yue nan ren ma?", vietnamese: "Ban la nguoi Viet Nam phai khong?" },
    ],
    questions: [
      {
        id: "q1",
        type: "choice",
        promptVi: "Cau nao dung de noi 'Toi la nguoi Viet Nam'?",
        options: ["我是越南人。", "我很好。", "谢谢。"],
        answer: "我是越南人。",
        explanationVi: "我是越南人 co nghia la Toi la nguoi Viet Nam.",
      },
      {
        id: "q2",
        type: "blank",
        promptVi: "Dien tu con thieu: 我____安。",
        chinese: "我____安。",
        pinyin: "wo ____ An.",
        answer: "叫",
        explanationVi: "叫 dung de noi ten: 我叫安。",
      },
    ],
  },
  {
    id: "love-chat-basic",
    titleVi: "Nhan tin tinh cam co ban",
    titleZh: "恋爱聊天基础",
    level: "beginner",
    descriptionVi: "Hoc cac cau ngan de hoi tham va the hien su quan tam.",
    vocabulary: [
      { id: "miss", chinese: "想", pinyin: "xiang", vietnamese: "Nho / muon" },
      { id: "busy", chinese: "忙", pinyin: "mang", vietnamese: "Ban" },
      { id: "tired", chinese: "累", pinyin: "lei", vietnamese: "Met" },
    ],
    sentences: [
      { id: "s1", chinese: "我想你。", pinyin: "wo xiang ni.", vietnamese: "Em/Anh nho anh/em." },
      { id: "s2", chinese: "你今天忙吗？", pinyin: "ni jin tian mang ma?", vietnamese: "Hom nay anh/em co ban khong?" },
      { id: "s3", chinese: "早点休息。", pinyin: "zao dian xiu xi.", vietnamese: "Nghi ngoi som nhe." },
    ],
    dialogue: [
      { id: "d1", speakerVi: "A", chinese: "你今天忙吗？", pinyin: "ni jin tian mang ma?", vietnamese: "Hom nay anh/em co ban khong?" },
      { id: "d2", speakerVi: "B", chinese: "有一点忙。", pinyin: "you yi dian mang.", vietnamese: "Hoi ban mot chut." },
      { id: "d3", speakerVi: "A", chinese: "早点休息，我想你。", pinyin: "zao dian xiu xi, wo xiang ni.", vietnamese: "Nghi som nhe, em/anh nho anh/em." },
    ],
    questions: [
      {
        id: "q1",
        type: "choice",
        promptVi: "我想你 co nghia la gi?",
        options: ["Toi nho ban", "Toi la nguoi Viet Nam", "Tam biet"],
        answer: "Toi nho ban",
        explanationVi: "想 trong cau nay co nghia la nho.",
      },
      {
        id: "q2",
        type: "blank",
        promptVi: "Dien tu con thieu: 早点____。",
        chinese: "早点____。",
        pinyin: "zao dian ____.",
        answer: "休息",
        explanationVi: "早点休息 co nghia la nghi ngoi som nhe.",
      },
    ],
  },
  {
    id: "food-shopping-basic",
    titleVi: "Goi mon va mua sam",
    titleZh: "点餐购物基础",
    level: "beginner",
    descriptionVi: "Dung cac cau don gian khi an uong, mua do va hoi gia.",
    vocabulary: [
      { id: "want", chinese: "要", pinyin: "yao", vietnamese: "Muon / can" },
      { id: "money", chinese: "多少钱", pinyin: "duo shao qian", vietnamese: "Bao nhieu tien" },
      { id: "water", chinese: "水", pinyin: "shui", vietnamese: "Nuoc" },
    ],
    sentences: [
      { id: "s1", chinese: "我要一杯水。", pinyin: "wo yao yi bei shui.", vietnamese: "Toi muon mot coc nuoc." },
      { id: "s2", chinese: "这个多少钱？", pinyin: "zhe ge duo shao qian?", vietnamese: "Cai nay bao nhieu tien?" },
      { id: "s3", chinese: "太贵了。", pinyin: "tai gui le.", vietnamese: "Dat qua." },
    ],
    dialogue: [
      { id: "d1", speakerVi: "Khach", chinese: "我要一杯水。", pinyin: "wo yao yi bei shui.", vietnamese: "Toi muon mot coc nuoc." },
      { id: "d2", speakerVi: "Nhan vien", chinese: "好的。", pinyin: "hao de.", vietnamese: "Duoc a." },
      { id: "d3", speakerVi: "Khach", chinese: "这个多少钱？", pinyin: "zhe ge duo shao qian?", vietnamese: "Cai nay bao nhieu tien?" },
    ],
    questions: [
      {
        id: "q1",
        type: "choice",
        promptVi: "Cau nao dung de hoi gia?",
        options: ["这个多少钱？", "我想你。", "我很好。"],
        answer: "这个多少钱？",
        explanationVi: "多少钱 dung de hoi 'bao nhieu tien'.",
      },
      {
        id: "q2",
        type: "blank",
        promptVi: "Dien tu con thieu: 我要一杯____。",
        chinese: "我要一杯____。",
        pinyin: "wo yao yi bei ____.",
        answer: "水",
        explanationVi: "水 co nghia la nuoc.",
      },
    ],
  },
];

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
