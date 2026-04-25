// ข้อมูลคำทำนายเซียมซี
const data = [
  { f: "ชีวิตกำลังค่อย ๆ ดีขึ้น แม้ยังไม่สมบูรณ์ แต่เส้นทางเริ่มชัดเจนขึ้นแล้ว", q: "ชีวิตไม่ต้องปัง แค่ไม่พังก็พอแล้ว" },
  { f: "ความสับสนจะคลี่คลาย คุณจะหาคำตอบได้ด้วยตัวเอง", q: "งงได้ แต่อย่านาน เดี๋ยวสวยไม่ทัน" },
  { f: "คุณกำลังเหนื่อย แต่คุณแข็งแกร่งพอจะผ่านมันไป", q: "เหนื่อยก็พัก แต่ห้ามพักยาวจนลืมสู้" },
  { f: "การจากไปของบางคนคือโอกาสใหม่ในชีวิตคุณ", q: "เสียคนไม่ดีไป ได้พื้นที่ให้คนดีเข้ามา" },
  { f: "โชคกำลังมาแบบช้าแต่มั่นคง", q: "ช้าแต่ชัวร์ ดีกว่ารีบแล้วพัง" },
  { f: "ความผิดพลาดจะกลายเป็นพลังของคุณ", q: "ล้มไม่เจ็บเท่าไม่ล้มแล้วไม่โต" },
  { f: "คุณจะรักตัวเองมากขึ้นและเลือกคนได้ดีขึ้น", q: "ใจเรามีค่า อย่าเอาไปแลกกับใครมั่ว ๆ" },
  { f: "โอกาสใหม่กำลังมา แม้ไม่พร้อมแต่คุณเอาอยู่", q: "ไม่ได้พร้อม แต่ก็ไม่ถอย" },
  { f: "สุดท้ายคุณจะผ่านทุกอย่างไปได้", q: "วันนี้อาจแย่ แต่เราไม่แย่ไปตลอด" }
];

/**
 * ฟังก์ชันหลักในการสุ่มเซียมซี
 */
function draw() {
  // ดึง Element ต่างๆ มาเตรียมไว้
  const nameInput = document.getElementById("name");
  const stick = document.getElementById("stick");
  const sound = document.getElementById("sound");
  const resultDiv = document.getElementById("result");
  
  const name = nameInput.value.trim() || "คุณ";

  // เริ่มเอฟเฟกต์การเขย่า
  stick.classList.add("shake");
  
  // เล่นเสียง (ถ้าไฟล์เสียงโหลดผ่าน)
  if (sound) {
    sound.currentTime = 0; // เริ่มใหม่ทุกครั้งที่กด
    sound.play().catch(e => console.log("Audio play blocked by browser"));
  }

  // หน่วงเวลา 0.5 วินาทีเพื่อให้แอนิเมชันเขย่าทำงานก่อนแสดงผล
  setTimeout(() => {
    stick.classList.remove("shake");

    // สุ่มดัชนีจากอาเรย์ข้อมูล
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedData = data[randomIndex];

    // อัปเดตเนื้อหาในหน้าเว็บ
    document.getElementById("number").innerText = `เซียมซีหมายเลข ${randomIndex + 1}`;
    document.getElementById("fortune").innerText = `${name} : ${selectedData.f}`;
    document.getElementById("quote").innerText = selectedData.q;

    // แสดงส่วนผลลัพธ์
    resultDiv.style.display = "block";
    
    // Scroll ลงมาดูผลลัพธ์ (แถมให้เผื่อหน้าจอมือถือ)
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

/**
 * ฟังก์ชันคัดลอกข้อความไปที่ Clipboard
 */
function share() {
  const fortuneText = document.getElementById("fortune").innerText;
  const quoteText = document.getElementById("quote").innerText;
  const fullText = `${fortuneText}\n"${quoteText}"`;

  // ใช้ Clipboard API
  navigator.clipboard.writeText(fullText).then(() => {
    alert("คัดลอกคำทำนายแล้ว แชร์ให้เพื่อนดูได้เลย! 🧘🏻‍♀️📿");
  }).catch(err => {
    console.error('ไม่สามารถคัดลอกได้:', err);
  });
}