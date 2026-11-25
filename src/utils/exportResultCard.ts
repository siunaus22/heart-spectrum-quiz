import { DIMENSION_LABELS, type DiagnosisResult, type DimensionKey } from '../data/quizData';

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const chars = Array.from(text);
  let line = '';
  let currY = y;

  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, currY);
      line = chars[i];
      currY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currY);
    currY += lineHeight;
  }
  return currY;
}

export function generateDiagnosisCardPng(
  result: DiagnosisResult,
  sameTypePercent: number
): string {
  const width = 750;
  const height = 1280;
  const scale = 2;

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('无法创建 Canvas 2D 上下文');
  }
  ctx.scale(scale, scale);

  // 1. 梦幻渐变背景
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFF5F7');
  bgGrad.addColorStop(0.5, '#F3ECFA');
  bgGrad.addColorStop(1, '#E6F0F8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 点阵装饰
  ctx.fillStyle = 'rgba(229, 179, 198, 0.25)';
  for (let gx = 24; gx < width; gx += 28) {
    for (let gy = 24; gy < height; gy += 28) {
      ctx.beginPath();
      ctx.arc(gx, gy, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. 拍立得主卡片
  const cardX = 36;
  const cardY = 48;
  const cardW = width - 72;
  const cardH = height - 110;

  ctx.save();
  ctx.shadowColor = 'rgba(126, 94, 134, 0.18)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.fillStyle = '#FFFCFD';
  ctx.fill();
  ctx.restore();

  roundRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 顶部和纸胶带
  ctx.save();
  ctx.translate(width / 2, cardY);
  ctx.rotate(-0.03);
  const tapeGrad = ctx.createLinearGradient(-75, -12, 75, 12);
  tapeGrad.addColorStop(0, 'rgba(247, 198, 214, 0.85)');
  tapeGrad.addColorStop(1, 'rgba(205, 222, 246, 0.85)');
  ctx.fillStyle = tapeGrad;
  roundRect(ctx, -78, -14, 156, 28, 4);
  ctx.fill();
  ctx.restore();

  // 顶部编号与心率
  ctx.fillStyle = '#8F7C93';
  ctx.font = '600 18px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('HEART SPECTRUM REPORT', cardX + 34, cardY + 52);

  ctx.textAlign = 'right';
  ctx.fillStyle = result.archetype.themeColor;
  ctx.fillText(`♥ ${result.heartRateBpm} BPM · 契合度 ${result.matchScore}%`, cardX + cardW - 34, cardY + 52);
  ctx.textAlign = 'left';

  // 3. 拍立得照片框区域
  const photoX = cardX + 30;
  const photoY = cardY + 72;
  const photoW = cardW - 60;
  const photoH = 216;

  const photoGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
  photoGrad.addColorStop(0, result.archetype.accentBg);
  photoGrad.addColorStop(1, '#F5EFFC');
  roundRect(ctx, photoX, photoY, photoW, photoH, 20);
  ctx.fillStyle = photoGrad;
  ctx.fill();
  ctx.strokeStyle = '#F2E4EE';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 照片框内的纯矢量小徽章
  const cx = width / 2;
  const cy = photoY + 62;
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = result.archetype.themeColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 绘制中心爱心符号
  ctx.beginPath();
  ctx.moveTo(cx, cy + 16);
  ctx.bezierCurveTo(cx - 22, cy + 2, cx - 22, cy - 16, cx - 8, cy - 16);
  ctx.bezierCurveTo(cx - 2, cy - 16, cx, cy - 10, cx, cy - 10);
  ctx.bezierCurveTo(cx, cy - 10, cx + 2, cy - 16, cx + 8, cy - 16);
  ctx.bezierCurveTo(cx + 22, cy - 16, cx + 22, cy + 2, cx, cy + 16);
  ctx.fillStyle = result.archetype.themeColor;
  ctx.fill();

  // 类型标题
  ctx.textAlign = 'center';
  ctx.fillStyle = '#3D313F';
  ctx.font = 'bold 34px "STKaiti", "KaiTi", "PingFang SC", serif';
  ctx.fillText(`【${result.archetype.title}】`, cx, photoY + 138);

  ctx.fillStyle = '#6B596E';
  ctx.font = '600 19px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(`代表角色：${result.archetype.characters}`, cx, photoY + 172);

  ctx.fillStyle = '#97859B';
  ctx.font = '15px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(`${result.archetype.animeSource} · 全站约 ${sameTypePercent}% 同频`, cx, photoY + 198);
  ctx.textAlign = 'left';

  // 4. 一句话签语
  let cursorY = photoY + photoH + 34;
  ctx.fillStyle = result.archetype.themeColor;
  ctx.font = 'italic 600 19px "STKaiti", "KaiTi", "PingFang SC", serif';
  cursorY = wrapText(ctx, result.archetype.tagline, cardX + 34, cursorY, cardW - 68, 28);

  // 5. 四维恋爱频谱
  cursorY += 14;
  ctx.fillStyle = '#3D313F';
  ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('♡ 四维恋爱频谱', cardX + 34, cursorY);
  cursorY += 22;

  const dimKeys: DimensionKey[] = ['directness', 'possessiveness', 'slowBurn', 'pureLove'];
  const colW = (cardW - 88) / 2;

  dimKeys.forEach((key, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const dx = cardX + 34 + col * (colW + 20);
    const dy = cursorY + row * 48;
    const meta = DIMENSION_LABELS[key];
    const val = result.dimensions[key];

    ctx.fillStyle = '#5E4E60';
    ctx.font = '600 16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(meta.name, dx, dy + 14);
    ctx.textAlign = 'right';
    ctx.fillStyle = meta.color;
    ctx.fillText(`${val}%`, dx + colW, dy + 14);
    ctx.textAlign = 'left';

    roundRect(ctx, dx, dy + 22, colW, 10, 5);
    ctx.fillStyle = '#F2EBF4';
    ctx.fill();

    roundRect(ctx, dx, dy + 22, Math.max(12, (colW * val) / 100), 10, 5);
    ctx.fillStyle = meta.color;
    ctx.fill();
  });

  cursorY += 116;

  // 6. 恋爱成分表
  ctx.fillStyle = '#3D313F';
  ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('♡ 恋爱成分表', cardX + 34, cursorY);
  cursorY += 22;

  result.ingredients.forEach((item) => {
    ctx.fillStyle = '#5C4D5E';
    ctx.font = '500 16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(item.name, cardX + 34, cursorY + 14);

    const barX = cardX + 165;
    const barW = cardW - 265;
    roundRect(ctx, barX, cursorY + 3, barW, 12, 6);
    ctx.fillStyle = '#F3ECF5';
    ctx.fill();

    roundRect(ctx, barX, cursorY + 3, Math.max(14, (barW * item.percent) / 100), 12, 6);
    ctx.fillStyle = item.color;
    ctx.fill();

    ctx.textAlign = 'right';
    ctx.fillStyle = '#6D5C70';
    ctx.font = '600 16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${item.percent}%`, cardX + cardW - 34, cursorY + 15);
    ctx.textAlign = 'left';

    cursorY += 32;
  });

  // 7. 专属攻略指南
  cursorY += 18;
  ctx.fillStyle = '#3D313F';
  ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('♡ 专属攻略指南', cardX + 34, cursorY);
  cursorY += 26;

  ctx.font = '16px "PingFang SC", "Microsoft YaHei", sans-serif';
  result.archetype.strategyGuide.forEach((tip, idx) => {
    ctx.fillStyle = '#5A4B5C';
    cursorY = wrapText(ctx, `${idx + 1}. ${tip}`, cardX + 34, cursorY, cardW - 68, 24);
    cursorY += 6;
  });

  // 8. 宿命 CP 推荐框
  cursorY += 8;
  const cpBoxH = 104;
  roundRect(ctx, cardX + 30, cursorY, cardW - 60, cpBoxH, 16);
  ctx.fillStyle = '#FAF4FA';
  ctx.fill();
  ctx.strokeStyle = '#EAD8EC';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#8B62A8';
  ctx.font = 'bold 18px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(`✦ 宿命 CP 推荐：【${result.archetype.destinedCp.typeName}】`, cardX + 48, cursorY + 32);

  ctx.fillStyle = '#645466';
  ctx.font = '15px "PingFang SC", "Microsoft YaHei", sans-serif';
  wrapText(ctx, result.archetype.destinedCp.reason, cardX + 48, cursorY + 58, cardW - 96, 22);

  // 9. 底部水印（严格按要求保留）
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8B798F';
  ctx.font = '600 17px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('Bilibili Toy · 心动频谱测试', width / 2, height - 26);

  return canvas.toDataURL('image/png');
}
