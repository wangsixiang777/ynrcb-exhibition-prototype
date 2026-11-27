# -*- coding: utf-8 -*-
"""把资料包里的实拍和人员表压成预览用图，并写出对照清单。"""
import json
from pathlib import Path

import xlrd
from PIL import Image, ImageOps

root = Path(r"H:\洪波外包\1127农商行制作内容")
demo = Path(r"H:\洪波外包\1127农商行制作内容\演示文件")
out = demo / "public" / "real"
out.mkdir(parents=True, exist_ok=True)


def save_jpeg(src: Path, dest: Path, max_side: int) -> None:
    img = ImageOps.exif_transpose(Image.open(src))
    if img.mode not in ("RGB",):
        img = img.convert("RGB")
    img.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=82, optimize=True)


branch_dirs = {
    "dali": "大理市农商行营业部",
    "hekou": "河口信用社",
    "dulong": "独龙江信用社",
    "yangla": "羊拉信用社",
    "penglai": "蓬莱信用社",
}
photos_root = root / "五个特色网点图文" / "网点照片"
branches = {}
for key, folder in branch_dirs.items():
    files = sorted(
        [p for p in (photos_root / folder).iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"}],
        key=lambda p: p.stat().st_size,
    )
    # 门头图优先，其余取体积适中的一张作主图
    hero = next((p for p in files if "门头" in p.name or "图2" in p.name), files[0])
    rel = f"real/branches/{key}.jpg"
    save_jpeg(hero, demo / "public" / rel, 1600)
    branches[key] = rel

poverty_src = next((root / "全球减贫案例").glob("*.jpg"))
save_jpeg(poverty_src, demo / "public" / "real" / "poverty.jpg", 1400)

book = xlrd.open_workbook(str(demo.parent / "_req_extract" / "各类网点清单_decrypted.xls")) if False else xlrd.open_workbook(
    str(Path(r"H:\洪波外包\_req_extract\各类网点清单_decrypted.xls"))
)
# people
people_book = xlrd.open_workbook(str(root / "笑脸墙" / "附件2：人员情况表.xls"))
sheet = people_book.sheet_by_index(0)
rows = []
for ri in range(1, sheet.nrows):
    name = str(sheet.cell_value(ri, 1)).strip()
    city = str(sheet.cell_value(ri, 2)).strip()
    org = str(sheet.cell_value(ri, 3)).strip()
    role = str(sheet.cell_value(ri, 4)).strip()
    if name:
        rows.append({"name": name, "city": city, "org": org, "role": role})

photo_files = [
    p
    for p in (root / "笑脸墙").rglob("*")
    if p.suffix.lower() in {".jpg", ".jpeg", ".png"}
]
used = set()
people = []
for person in rows:
    match = next((p for p in photo_files if person["name"] in p.name and p not in used), None)
    if match is None:
        match = next((p for p in photo_files if person["name"] in str(p) and p not in used), None)
    photo = ""
    if match:
        used.add(match)
        safe = f"{person['city']}-{person['name']}.jpg"
        rel = f"real/smiles/{safe}"
        save_jpeg(match, demo / "public" / rel, 720)
        photo = rel
    people.append({**person, "photo": photo})

manifest = {
    "branches": branches,
    "poverty": "real/poverty.jpg",
    "people": people,
    "matched": sum(1 for p in people if p["photo"]),
    "total": len(people),
}
(demo / "src" / "data" / "real.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
print("matched", manifest["matched"], "/", manifest["total"])
print("unmatched", [p["name"] for p in people if not p["photo"]])
