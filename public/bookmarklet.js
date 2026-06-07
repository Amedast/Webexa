/* eslint-disable */
(function () {
  "use strict";

  // ─── Constants ──────────────────────────────────────────────────────────────
  var POPUP_ID = "__wb_popup__";
  var JSZIP_CDN =
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";

  // ─── Remove existing popup if open ──────────────────────────────────────────
  var existing = document.getElementById(POPUP_ID);
  if (existing) {
    existing.remove();
    return;
  }

  // ─── Styles ──────────────────────────────────────────────────────────────────
  var styles = `
    #${POPUP_ID} * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
    #${POPUP_ID} {
      position: fixed; top: 20px; right: 20px; z-index: 2147483647;
      width: 480px; max-height: 85vh;
      background: #0f0f13; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; box-shadow: 0 25px 60px rgba(0,0,0,0.6);
      display: flex; flex-direction: column; overflow: hidden;
      color: #e8e8f0; font-size: 13px;
      animation: __wb_slide_in 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes __wb_slide_in {
      from { opacity: 0; transform: translateY(-12px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    #${POPUP_ID} .__wb_header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.08);
      background: #0f0f13; flex-shrink: 0;
    }
    #${POPUP_ID} .__wb_logo { font-size: 14px; font-weight: 700; color: #a78bfa; letter-spacing: -0.3px; }
    #${POPUP_ID} .__wb_close {
      background: rgba(255,255,255,0.08); border: none; color: #999; cursor: pointer;
      width: 26px; height: 26px; border-radius: 50%; font-size: 16px; line-height: 1;
      display: flex; align-items: center; justify-content: center; transition: background 0.15s;
    }
    #${POPUP_ID} .__wb_close:hover { background: rgba(255,255,255,0.18); color: #fff; }
    #${POPUP_ID} .__wb_tabs { display: flex; padding: 10px 16px 0; gap: 4px; flex-shrink: 0; }
    #${POPUP_ID} .__wb_tab {
      padding: 6px 14px; border-radius: 8px 8px 0 0; cursor: pointer;
      font-size: 12px; font-weight: 500; border: none; transition: all 0.15s;
      background: transparent; color: #777;
    }
    #${POPUP_ID} .__wb_tab.__wb_active { background: rgba(167,139,250,0.15); color: #a78bfa; }
    #${POPUP_ID} .__wb_tab:hover:not(.__wb_active) { color: #ccc; background: rgba(255,255,255,0.05); }
    #${POPUP_ID} .__wb_body { flex: 1; overflow-y: auto; padding: 16px; min-height: 0; }
    #${POPUP_ID} .__wb_body::-webkit-scrollbar { width: 4px; }
    #${POPUP_ID} .__wb_body::-webkit-scrollbar-track { background: transparent; }
    #${POPUP_ID} .__wb_body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
    #${POPUP_ID} .__wb_toolbar {
      display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; align-items: center;
    }
    #${POPUP_ID} .__wb_btn {
      padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 500;
      border: none; cursor: pointer; transition: all 0.15s; white-space: nowrap;
    }
    #${POPUP_ID} .__wb_btn-primary { background: #a78bfa; color: #fff; }
    #${POPUP_ID} .__wb_btn-primary:hover { background: #9061f9; }
    #${POPUP_ID} .__wb_btn-primary:disabled { opacity: 0.4; cursor: default; }
    #${POPUP_ID} .__wb_btn-secondary {
      background: rgba(255,255,255,0.08); color: #ccc; border: 1px solid rgba(255,255,255,0.1);
    }
    #${POPUP_ID} .__wb_btn-secondary:hover { background: rgba(255,255,255,0.14); color: #fff; }
    #${POPUP_ID} .__wb_select {
      padding: 5px 10px; border-radius: 8px; font-size: 12px;
      background: rgba(255,255,255,0.08); color: #ccc;
      border: 1px solid rgba(255,255,255,0.1); outline: none; cursor: pointer;
    }
    #${POPUP_ID} .__wb_select option {
      background: #0f0f13;
      color: #ccc;
    }
    #${POPUP_ID} .__wb_select:focus { border-color: #a78bfa; }
    #${POPUP_ID} .__wb_img_grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px;
    }
    #${POPUP_ID} .__wb_img_card {
      position: relative; border-radius: 8px; overflow: hidden;
      background: rgba(255,255,255,0.05); border: 2px solid transparent;
      cursor: pointer; transition: border-color 0.15s; aspect-ratio: 1;
    }
    #${POPUP_ID} .__wb_img_card:hover { border-color: rgba(167,139,250,0.5); }
    #${POPUP_ID} .__wb_img_card.__wb_selected { border-color: #a78bfa; }
    #${POPUP_ID} .__wb_img_card img { width: 100%; height: 100%; object-fit: cover; display: block; }
    #${POPUP_ID} .__wb_img_check {
      position: absolute; top: 6px; right: 6px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #a78bfa; color: #fff; display: none;
      align-items: center; justify-content: center; font-size: 10px;
    }
    #${POPUP_ID} .__wb_img_card.__wb_selected .__wb_img_check { display: flex; }
    #${POPUP_ID} .__wb_count { font-size: 11px; color: #777; margin-left: auto; }
    #${POPUP_ID} .__wb_empty { text-align: center; color: #555; padding: 32px 0; font-size: 13px; }
    #${POPUP_ID} .__wb_swatches { display: flex; flex-wrap: wrap; gap: 16px 10px; margin-bottom: 20px; }
    #${POPUP_ID} .__wb_swatch_wrapper { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    #${POPUP_ID} .__wb_swatch {
      width: 48px; height: 48px; border-radius: 10px;
      cursor: pointer; border: 1px solid rgba(255,255,255,0.1);
      transition: transform 0.15s;
    }
    #${POPUP_ID} .__wb_swatch:hover { transform: scale(1.08); }
    #${POPUP_ID} .__wb_swatch_label {
      font-size: 9px; color: #888; font-family: monospace;
    }
    #${POPUP_ID} .__wb_fonts { display: flex; flex-direction: column; gap: 10px; }
    #${POPUP_ID} .__wb_font_card {
      background: rgba(255,255,255,0.04); border-radius: 10px;
      padding: 12px 14px; border: 1px solid rgba(255,255,255,0.08);
    }
    #${POPUP_ID} .__wb_font_name { font-size: 11px; color: #666; margin-bottom: 4px; }
    #${POPUP_ID} .__wb_font_preview { font-size: 22px; color: #e8e8f0; }
    #${POPUP_ID} .__wb_section_title { font-size: 11px; font-weight: 600; color: #777; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.8px; }
#${POPUP_ID} .__wb_toast {
      position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
      background: #a78bfa; color: #fff; padding: 8px 16px; border-radius: 20px;
      font-size: 12px; font-weight: 500; pointer-events: none;
      animation: __wb_toast_in 0.2s ease, __wb_toast_out 0.3s 1.5s ease forwards;
    }
    @keyframes __wb_toast_in { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    @keyframes __wb_toast_out { to { opacity: 0; transform: translateX(-50%) translateY(8px); } }

    /* CORS Overlay */
    #${POPUP_ID} .__wb_overlay {
      position: absolute; inset: 0;
      background: #0f0f13;
      display: flex; flex-direction: column;
      padding: 18px; z-index: 100;
      animation: __wb_fade_in 0.2s ease-out;
    }
    @keyframes __wb_fade_in { from { opacity: 0; } to { opacity: 1; } }
    #${POPUP_ID} .__wb_overlay_title { font-size: 15px; font-weight: 700; color: #f87171; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
    #${POPUP_ID} .__wb_overlay_text { font-size: 12px; color: #9ca3af; margin-bottom: 12px; line-height: 1.5; text-align: left; }
    #${POPUP_ID} .__wb_overlay_list {
      flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;
      padding-right: 4px;
    }
    #${POPUP_ID} .__wb_overlay_item {
      display: flex; align-items: center; gap: 10px; padding: 8px;
      background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);
    }
    #${POPUP_ID} .__wb_overlay_thumb { width: 36px; height: 36px; object-fit: cover; border-radius: 4px; background: #1a1a24; flex-shrink: 0; }
    #${POPUP_ID} .__wb_overlay_url { font-size: 11px; color: #d1d5db; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; flex: 1; text-align: left; }
    #${POPUP_ID} .__wb_overlay_btn-row { display: flex; gap: 10px; flex-shrink: 0; }
  `;

  // ─── Inject styles ────────────────────────────────────────────────────────────
  var styleEl = document.createElement("style");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // ─── State ────────────────────────────────────────────────────────────────────
  var state = {
    tab: "images",
    images: [],
    selected: new Set(),
    format: "original",
  };

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  function toast(msg) {
    var old = popup.querySelector(".__wb_toast");
    if (old) old.remove();
    var el = document.createElement("div");
    el.className = "__wb_toast";
    el.textContent = msg;
    popup.appendChild(el);
    setTimeout(function () {
      el.remove();
    }, 2000);
  }

  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  // ─── Image extraction ────────────────────────────────────────────────────────
  function extractImages() {
    var urls = new Set();

    // <img> tags
    document.querySelectorAll("img").forEach(function (img) {
      var src = img.currentSrc || img.src;
      if (src && !src.startsWith("data:") && src.length > 10) urls.add(src);
    });

    // background-image via computed styles (sample top elements)
    document.querySelectorAll("*").forEach(function (el) {
      var bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        var match = bg.match(/url\(["']?([^"')]+)["']?\)/g);
        if (match)
          match.forEach(function (m) {
            var u = m.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
            if (u && !u.startsWith("data:")) urls.add(u);
          });
      }
    });

    // Open Graph
    var ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && ogImage.content) urls.add(ogImage.content);

    return Array.from(urls)
      .filter(function (u) {
        return u.startsWith("http") || u.startsWith("//") || u.startsWith("/");
      })
      .map(function (u) {
        try {
          return new URL(u, location.href).href;
        } catch (_e) {
          return u;
        }
      });
  }

  // ─── Style extraction ─────────────────────────────────────────────────────────
  function extractStyles() {
    var colorMap = {};
    var fontSet = new Set();

    var elements = Array.from(document.querySelectorAll("*")).slice(0, 500);
    elements.forEach(function (el) {
      var cs = window.getComputedStyle(el);
      ["color", "background-color", "border-color"].forEach(function (prop) {
        var val = cs.getPropertyValue(prop);
        if (val && val !== "rgba(0, 0, 0, 0)" && val !== "transparent") {
          colorMap[val] = (colorMap[val] || 0) + 1;
        }
      });
      var font = cs.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
      if (font && font.length > 1) fontSet.add(font);
    });

    var colors = Object.entries(colorMap)
      .sort(function (a, b) {
        return b[1] - a[1];
      })
      .slice(0, 24)
      .map(function (e) {
        return e[0];
      });

    return { colors: colors, fonts: Array.from(fontSet).slice(0, 10) };
  }

  // ─── RGB to Hex ───────────────────────────────────────────────────────────────
  function rgbToHex(rgb) {
    var m = rgb.match(/\d+/g);
    if (!m || m.length < 3) return rgb;
    return (
      "#" +
      [m[0], m[1], m[2]]
        .map(function (x) {
          return parseInt(x).toString(16).padStart(2, "0");
        })
        .join("")
        .toUpperCase()
    );
  }

  // ─── Render functions ─────────────────────────────────────────────────────────
  function renderImages() {
    var body = popup.querySelector(".__wb_body");
    var imgs = state.images;

    body.innerHTML = `
      <div class="__wb_toolbar">
        <button class="__wb_btn __wb_btn-secondary" id="__wb_sel_all">Select all</button>
        <button class="__wb_btn __wb_btn-secondary" id="__wb_sel_none">Clear</button>
        <select class="__wb_select" id="__wb_fmt">
          <option value="original">Original format</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WebP</option>
        </select>
        <span class="__wb_count" id="__wb_sel_count">0 selected</span>
      </div>
      <div class="__wb_toolbar">
        <button class="__wb_btn __wb_btn-primary" id="__wb_dl_sel" disabled>⬇ Download Selected (ZIP)</button>
        <button class="__wb_btn __wb_btn-primary" id="__wb_dl_all">⬇ Download All (ZIP)</button>
      </div>
      <div class="__wb_img_grid" id="__wb_img_grid"></div>
    `;

    if (imgs.length === 0) {
      body.querySelector(".__wb_img_grid").innerHTML =
        '<p class="__wb_empty">No images found on this page.</p>';
    } else {
      var grid = body.querySelector(".__wb_img_grid");
      imgs.forEach(function (src, i) {
        var card = document.createElement("div");
        card.className = "__wb_img_card";
        card.dataset.src = src;
        card.dataset.idx = i;
        card.innerHTML = `
          <img src="${src}" alt="" loading="lazy" onerror="this.parentElement.style.display='none'"/>
          <div class="__wb_img_check">✓</div>
        `;
        card.addEventListener("click", function () {
          if (state.selected.has(src)) state.selected.delete(src);
          else state.selected.add(src);
          card.classList.toggle("__wb_selected", state.selected.has(src));
          updateImageToolbar();
        });
        grid.appendChild(card);
      });
    }

    function updateImageToolbar() {
      var count = state.selected.size;
      body.querySelector("#__wb_sel_count").textContent = count + " selected";
      body.querySelector("#__wb_dl_sel").disabled = count === 0;
    }

    body.querySelector("#__wb_sel_all").addEventListener("click", function () {
      state.selected.clear();
      imgs.forEach(function (s) {
        state.selected.add(s);
      });
      body.querySelectorAll(".__wb_img_card").forEach(function (c) {
        c.classList.add("__wb_selected");
      });
      updateImageToolbar();
    });

    body.querySelector("#__wb_sel_none").addEventListener("click", function () {
      state.selected.clear();
      body.querySelectorAll(".__wb_img_card").forEach(function (c) {
        c.classList.remove("__wb_selected");
      });
      updateImageToolbar();
    });

    body.querySelector("#__wb_fmt").addEventListener("change", function (e) {
      state.format = e.target.value;
    });

    body.querySelector("#__wb_dl_sel").addEventListener("click", function () {
      performDownloads("selected");
    });

    body.querySelector("#__wb_dl_all").addEventListener("click", function () {
      performDownloads("all");
    });
  }

  function triggerDownload(blob, filename) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      a.remove();
      URL.revokeObjectURL(a.href);
    }, 1000);
  }

  function getBlobAndConvert(url, targetFormat) {
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Fetch failed");
        return r.blob();
      })
      .then(function (blob) {
        var parts = url.split("?")[0].split(".");
        var baseExt =
          parts.length > 1 ? parts.pop().toLowerCase().slice(0, 5) : "jpg";
        if (!/^[a-z0-9]+$/.test(baseExt)) baseExt = "jpg";

        if (targetFormat === "original") {
          return { blob: blob, ext: baseExt };
        }
        return new Promise(function (resolve) {
          var img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var mime =
              "image/" + (targetFormat === "jpeg" ? "jpeg" : targetFormat);
            canvas.toBlob(
              function (newBlob) {
                if (newBlob) {
                  resolve({ blob: newBlob, ext: targetFormat });
                } else {
                  resolve({ blob: blob, ext: baseExt });
                }
              },
              mime,
              0.9,
            );
          };
          img.onerror = function () {
            resolve({ blob: blob, ext: baseExt });
          };
          img.src = URL.createObjectURL(blob);
        });
      });
  }

  function showCorsOverlay(failures) {
    var overlay = document.createElement("div");
    overlay.className = "__wb_overlay";

    var itemsHtml = failures
      .map(function (item) {
        return `
        <div class="__wb_overlay_item">
          <img src="${item.url}" class="__wb_overlay_thumb" />
          <span class="__wb_overlay_url">${item.url}</span>
          <button class="__wb_btn __wb_btn-secondary" style="padding: 3px 8px; font-size: 10px;" onclick="navigator.clipboard.writeText('${item.url}')">Copy</button>
        </div>
      `;
      })
      .join("");

    overlay.innerHTML = `
      <h3 class="__wb_overlay_title">⚠️ Security Block (CORS)</h3>
      <p class="__wb_overlay_text">Browser security rules prevent downloading these images automatically. You can still get them:</p>
      
      <div style="font-size: 11px; margin-bottom: 12px; color: #ddd; line-height: 1.4; text-align: left;">
        1. <strong>Right-click</strong> the image in the grid behind this panel and select <strong>"Save image as..."</strong>.<br/>
        2. Or use the links below to download them manually:
      </div>

      <div class="__wb_overlay_list">
        ${itemsHtml}
      </div>

      <div class="__wb_overlay_btn-row">
        <button class="__wb_btn __wb_btn-secondary" id="__wb_copy_failed_urls" style="flex: 1;">Copy all URLs</button>
        <button class="__wb_btn __wb_btn-primary" id="__wb_close_overlay" style="flex: 1;">Close</button>
      </div>
    `;

    popup.appendChild(overlay);

    overlay
      .querySelector("#__wb_copy_failed_urls")
      .addEventListener("click", function () {
        var allUrls = failures
          .map(function (f) {
            return f.url;
          })
          .join("\n");
        navigator.clipboard.writeText(allUrls).then(function () {
          toast("All URLs copied!");
        });
      });

    overlay
      .querySelector("#__wb_close_overlay")
      .addEventListener("click", function () {
        overlay.remove();
      });
  }

  function performDownloads(mode) {
    var urls = mode === "selected" ? Array.from(state.selected) : state.images;
    if (urls.length === 0) return;

    toast("Fetching images...");

    var successes = [];
    var failures = [];

    var promises = urls.map(function (url, i) {
      return getBlobAndConvert(url, state.format)
        .then(function (result) {
          successes.push({
            url: url,
            blob: result.blob,
            ext: result.ext,
            index: i,
          });
        })
        .catch(function (err) {
          failures.push({ url: url, index: i });
        });
    });

    Promise.all(promises).then(function () {
      if (successes.length > 0) {
        var loadZip = typeof JSZip === "undefined";
        var processZip = function () {
          var zip = new JSZip();
          var folder = zip.folder("images");
          successes.forEach(function (item) {
            folder.file(
              "image-" + (item.index + 1) + "." + item.ext,
              item.blob,
            );
          });
          zip.generateAsync({ type: "blob" }).then(function (content) {
            triggerDownload(content, "webexa-images.zip");
            toast("ZIP downloaded!");
            if (failures.length > 0) {
              showCorsOverlay(failures);
            }
          });
        };

        if (loadZip) {
          loadScript(JSZIP_CDN, processZip);
        } else {
          processZip();
        }
      } else {
        toast("Download blocked by security rules");
        showCorsOverlay(failures);
      }
    });
  }

  function renderStyles() {
    var body = popup.querySelector(".__wb_body");
    var data = extractStyles();

    var swatchesHtml = data.colors
      .map(function (c) {
        var hex = rgbToHex(c);
        return `
        <div class="__wb_swatch_wrapper">
          <div class="__wb_swatch" style="background:${c}" title="${hex}" onclick="navigator.clipboard.writeText('${hex}').then(()=>{})"></div>
          <span class="__wb_swatch_label">${hex}</span>
        </div>
      `;
      })
      .join("");

    var fontsHtml = data.fonts
      .map(function (f) {
        return `
        <div class="__wb_font_card">
          <div class="__wb_font_name">${f}</div>
          <div class="__wb_font_preview" style="font-family:'${f}',sans-serif">Aa Bb Cc 123</div>
        </div>
      `;
      })
      .join("");

    body.innerHTML = `
      <div class="__wb_toolbar">
        <button class="__wb_btn __wb_btn-secondary" id="__wb_copy_all_colors">Copy all colors</button>
      </div>
      <p class="__wb_section_title">Color palette (${data.colors.length})</p>
      <div class="__wb_swatches" style="margin-bottom:28px">${swatchesHtml || '<p class="__wb_empty">No colors found.</p>'}</div>
      <p class="__wb_section_title">Typography (${data.fonts.length})</p>
      <div class="__wb_fonts">${fontsHtml || '<p class="__wb_empty">No fonts found.</p>'}</div>
    `;

    body
      .querySelector("#__wb_copy_all_colors")
      .addEventListener("click", function () {
        var hexColors = data.colors.map(rgbToHex).join(", ");
        navigator.clipboard
          .writeText(hexColors)
          .then(function () {
            toast("Colors copied!");
          })
          .catch(function () {
            toast("Copy failed — try manually.");
          });
      });

    body.querySelectorAll(".__wb_swatch").forEach(function (sw) {
      sw.addEventListener("click", function () {
        toast("Copied: " + sw.title);
      });
    });
  }

  // ─── Render popup ─────────────────────────────────────────────────────────────
  var popup = document.createElement("div");
  popup.id = POPUP_ID;

  popup.innerHTML = `
    <div class="__wb_header">
      <span class="__wb_logo" style="display: flex; align-items: center; gap: 6px;"><svg width="15" height="15" viewBox="0 0 100 100" fill="currentColor" style="color: #a78bfa; display: inline-block; vertical-align: middle;"><path fill-rule="evenodd" clip-rule="evenodd" d="M 50,0 L 93.3,25 L 93.3,75 L 50,100 L 6.7,75 L 6.7,25 Z M 50,16 L 79.4,33 L 79.4,67 L 50,84 L 20.6,67 L 20.6,33 Z M 50,33 L 64.7,41.5 L 64.7,58.5 L 50,67 L 35.3,58.5 L 35.3,41.5 Z" /></svg>Webexa</span>
      <button class="__wb_close" id="__wb_close_btn">×</button>
    </div>
    <div class="__wb_tabs">
      <button class="__wb_tab __wb_active" data-tab="images"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>Images</button>
      <button class="__wb_tab" data-tab="styles"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; display: inline-block; vertical-align: middle;"><path d="M12 22C17.52 22 22 17.52 22 12S17.52 2 12 2 2 6.48 2 12c0 2.2 1.8 4 4 4h1a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="11.5" cy="7.5" r="1"/><circle cx="16.5" cy="9.5" r="1"/></svg>Styles</button>
    </div>
    <div class="__wb_body"></div>
  `;

  document.body.appendChild(popup);

  // ─── Drag to move popup ────────────────────────────────────────────────────
  var header = popup.querySelector(".__wb_header");
  var isDragging = false,
    startX,
    startY,
    initRight,
    initTop;
  header.style.cursor = "grab";
  header.addEventListener("mousedown", function (e) {
    if (e.target.id === "__wb_close_btn") return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initRight = parseInt(popup.style.right || 20, 10);
    initTop = parseInt(popup.style.top || 20, 10);
    header.style.cursor = "grabbing";
  });
  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    var dx = e.clientX - startX,
      dy = e.clientY - startY;
    popup.style.right = initRight - dx + "px";
    popup.style.top = initTop + dy + "px";
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
    header.style.cursor = "grab";
  });

  // ─── Tab switching ────────────────────────────────────────────────────────────
  popup.querySelectorAll(".__wb_tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      popup.querySelectorAll(".__wb_tab").forEach(function (t) {
        t.classList.remove("__wb_active");
      });
      tab.classList.add("__wb_active");
      state.tab = tab.dataset.tab;
      if (state.tab === "images") renderImages();
      else renderStyles();
    });
  });

  popup.querySelector("#__wb_close_btn").addEventListener("click", function () {
    popup.remove();
    styleEl.remove();
  });

  // ─── Initial render ───────────────────────────────────────────────────────────
  state.images = extractImages();
  renderImages();
})();
