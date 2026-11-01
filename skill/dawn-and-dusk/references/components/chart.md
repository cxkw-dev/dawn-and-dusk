# chart — `chart`

Conventions for charts in dawn & dusk: recessive axes and grid, thin marks, the Golden hour series in a fixed order, and text that never wears a series colour. Static HTML and inline SVG — the same classes style SVG from D3 or any charting library.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/chart

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Anatomy — grouped columns

Title, subtitle and legend on top; y ticks in mono, solid hairline gridlines and a firmer baseline; bars ≤24px with a 4px rounded data end and 2px surface gaps. The table view carries every value. Try it: hover a day, or Tab into the plot and use ← → Home End; Esc hides the tooltip. Open “View as table”, or expand the chart with the button in the corner.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">Build minutes per day</p><p class="dd-chart__sub">Last 7 days · minutes on shared runners</p></div>
    <div class="dd-chart__actions"><ul class="dd-chart__legend"><li class="dd-chart__key dd-chart-s1">dawn-and-dusk</li><li class="dd-chart__key dd-chart-s2">dockey-ui</li></ul><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" data-dd-chart-expand aria-haspopup="dialog" aria-label="Expand chart"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-expand"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></div>
  </figcaption>
  <div class="dd-chart__frame">
    <div class="dd-chart__y" aria-hidden="true"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div>
    <div class="dd-chart__plot" role="group" aria-label="Build minutes per day, by project">
      <div class="dd-chart__cols">
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Mon Oct 20: dawn-and-dusk 42 min, dockey-ui 31 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:52.5"></span><span class="dd-chart__col dd-chart-s2" style="--v:38.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Mon, Oct 20</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>42 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>31 min</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Tue Oct 21: dawn-and-dusk 58 min, dockey-ui 40 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:72.5"></span><span class="dd-chart__col dd-chart-s2" style="--v:50"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Tue, Oct 21</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>58 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>40 min</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Wed Oct 22: dawn-and-dusk 35 min, dockey-ui 44 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:43.8"></span><span class="dd-chart__col dd-chart-s2" style="--v:55"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Wed, Oct 22</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>35 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>44 min</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Thu Oct 23: dawn-and-dusk 66 min, dockey-ui 29 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:82.5"></span><span class="dd-chart__col dd-chart-s2" style="--v:36.3"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Thu, Oct 23</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>66 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>29 min</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Fri Oct 24: dawn-and-dusk 51 min, dockey-ui 47 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:63.7"></span><span class="dd-chart__col dd-chart-s2" style="--v:58.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Fri, Oct 24</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>51 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>47 min</b></p></div>
        </div>
        <div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sat Oct 25: dawn-and-dusk 18 min, dockey-ui 9 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:22.5"></span><span class="dd-chart__col dd-chart-s2" style="--v:11.3"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Sat, Oct 25</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>18 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>9 min</b></p></div>
        </div>
        <div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sun Oct 26: dawn-and-dusk 12 min, dockey-ui 6 min">
          <span class="dd-chart__col dd-chart-s1" style="--v:15"></span><span class="dd-chart__col dd-chart-s2" style="--v:7.5"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Sun, Oct 26</p><p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk<b>12 min</b></p><p class="dd-chart__tip-row dd-chart-s2">dockey-ui<b>6 min</b></p></div>
        </div>
      </div>
    </div>
    <div class="dd-chart__x" aria-hidden="true"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
  </div>
  
  <details class="dd-chart__data">
    <summary>View as table</summary>
    <div class="dd-chart__data-scroll"><table>
      <caption class="dd-visually-hidden">Build minutes per day, by project</caption>
      <thead><tr><th scope="col">Day</th><th scope="col">dawn-and-dusk</th><th scope="col">dockey-ui</th></tr></thead>
      <tbody><tr><th scope="row">Mon Oct 20</th><td>42</td><td>31</td></tr><tr><th scope="row">Tue Oct 21</th><td>58</td><td>40</td></tr><tr><th scope="row">Wed Oct 22</th><td>35</td><td>44</td></tr><tr><th scope="row">Thu Oct 23</th><td>66</td><td>29</td></tr><tr><th scope="row">Fri Oct 24</th><td>51</td><td>47</td></tr><tr><th scope="row">Sat Oct 25</th><td>18</td><td>9</td></tr><tr><th scope="row">Sun Oct 26</th><td>12</td><td>6</td></tr></tbody>
    </table></div>
  </details>
</figure>
```

## Line

Lines are inline SVG on a 0–100 viewBox with `preserveAspectRatio="none"`, so the plot stretches to any width while `vector-effect: non-scaling-stroke` keeps every line at 2px. Markers, crosshair and end labels are HTML positioned by `--x` / `--y` percentages, so they stay round. End labels drop out on narrow cards — the legend stays.

Try it: hover the plot or Tab in and step through the hours with the arrow keys.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">Requests / min</p><p class="dd-chart__sub">Last 12 hours · us-east-1</p></div>
    <div class="dd-chart__actions"><ul class="dd-chart__legend"><li class="dd-chart__key dd-chart__key--line dd-chart-s1">edge-cache</li><li class="dd-chart__key dd-chart__key--line dd-chart-s2">auth-gateway</li></ul><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" data-dd-chart-expand aria-haspopup="dialog" aria-label="Expand chart"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-expand"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></div>
  </figcaption>
  <div class="dd-chart__frame">
    <div class="dd-chart__y" aria-hidden="true"><span>50K</span><span>40K</span><span>30K</span><span>20K</span><span>10K</span><span>0</span></div>
    <div class="dd-chart__plot" style="--dd-chart-ticks:5" role="group" aria-label="Requests per minute over the last 12 hours">
      <svg class="dd-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="dd-chart__line dd-chart-s1" d="M0 51.8 L9.1 56.4 L18.2 63.6 L27.3 68.2 L36.4 70.6 L45.5 69.6 L54.5 64.2 L63.6 55.2 L72.7 42.8 L81.8 32.2 L90.9 23.6 L100 17.4"/>
        <path class="dd-chart__line dd-chart-s2" d="M0 80.4 L9.1 82.6 L18.2 85.8 L27.3 87.6 L36.4 88.4 L45.5 88 L54.5 85.2 L63.6 81.8 L72.7 76.8 L81.8 74.2 L90.9 73.6 L100 75"/>
      </svg>
      <span class="dd-chart__marker dd-chart-s1" style="--x:100; --y:17.4"></span><span class="dd-chart__marker dd-chart-s2" style="--x:100; --y:75"></span>
      
      <div class="dd-chart__hits" style="--dd-chart-points:12">
        <div class="dd-chart__hit" style="--x:0" tabindex="0" role="img" aria-label="22:00: edge-cache 24.1K, auth-gateway 9.8K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:51.8"></span><span class="dd-chart__dot dd-chart-s2" style="--y:80.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">22:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>24.1K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>9.8K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:9.1" tabindex="0" role="img" aria-label="23:00: edge-cache 21.8K, auth-gateway 8.7K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:56.4"></span><span class="dd-chart__dot dd-chart-s2" style="--y:82.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">23:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>21.8K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>8.7K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:18.2" tabindex="0" role="img" aria-label="00:00: edge-cache 18.2K, auth-gateway 7.1K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:63.6"></span><span class="dd-chart__dot dd-chart-s2" style="--y:85.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">00:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>18.2K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>7.1K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:27.3" tabindex="0" role="img" aria-label="01:00: edge-cache 15.9K, auth-gateway 6.2K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:68.2"></span><span class="dd-chart__dot dd-chart-s2" style="--y:87.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">01:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>15.9K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>6.2K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:36.4" tabindex="0" role="img" aria-label="02:00: edge-cache 14.7K, auth-gateway 5.8K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:70.6"></span><span class="dd-chart__dot dd-chart-s2" style="--y:88.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">02:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>14.7K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>5.8K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:45.5" tabindex="0" role="img" aria-label="03:00: edge-cache 15.2K, auth-gateway 6K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:69.6"></span><span class="dd-chart__dot dd-chart-s2" style="--y:88"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">03:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>15.2K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>6K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:54.5" tabindex="0" role="img" aria-label="04:00: edge-cache 17.9K, auth-gateway 7.4K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:64.2"></span><span class="dd-chart__dot dd-chart-s2" style="--y:85.2"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">04:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>17.9K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>7.4K</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:63.6" tabindex="0" role="img" aria-label="05:00: edge-cache 22.4K, auth-gateway 9.1K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:55.2"></span><span class="dd-chart__dot dd-chart-s2" style="--y:81.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">05:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>22.4K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>9.1K</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:72.7" tabindex="0" role="img" aria-label="06:00: edge-cache 28.6K, auth-gateway 11.6K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:42.8"></span><span class="dd-chart__dot dd-chart-s2" style="--y:76.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">06:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>28.6K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>11.6K</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:81.8" tabindex="0" role="img" aria-label="07:00: edge-cache 33.9K, auth-gateway 12.9K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:32.2"></span><span class="dd-chart__dot dd-chart-s2" style="--y:74.2"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">07:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>33.9K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>12.9K</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:90.9" tabindex="0" role="img" aria-label="08:00: edge-cache 38.2K, auth-gateway 13.2K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:23.6"></span><span class="dd-chart__dot dd-chart-s2" style="--y:73.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">08:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>38.2K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>13.2K</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:100" tabindex="0" role="img" aria-label="09:00: edge-cache 41.3K, auth-gateway 12.5K">
          <span class="dd-chart__dot dd-chart-s1" style="--y:17.4"></span><span class="dd-chart__dot dd-chart-s2" style="--y:75"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">09:00</p><p class="dd-chart__tip-row dd-chart-s1">edge-cache<b>41.3K</b></p><p class="dd-chart__tip-row dd-chart-s2">auth-gateway<b>12.5K</b></p></div>
        </div>
      </div>
    </div>
    <div class="dd-chart__end" aria-hidden="true"><span class="dd-chart-s1" style="--y:17.4">edge-cache <b>41.3K</b></span><span class="dd-chart-s2" style="--y:75">auth-gateway <b>12.5K</b></span></div>
    <div class="dd-chart__x dd-chart__x--points" aria-hidden="true"><span>22:00</span><span class="is-minor">23:00</span><span class="is-minor">00:00</span><span>01:00</span><span class="is-minor">02:00</span><span class="is-minor">03:00</span><span>04:00</span><span class="is-minor">05:00</span><span class="is-minor">06:00</span><span>07:00</span><span class="is-minor">08:00</span><span class="is-minor">09:00</span></div>
  </div>
  
  <details class="dd-chart__data">
    <summary>View as table</summary>
    <div class="dd-chart__data-scroll"><table>
      <caption class="dd-visually-hidden">Requests per minute, last 12 hours</caption>
      <thead><tr><th scope="col">Hour</th><th scope="col">edge-cache (K/min)</th><th scope="col">auth-gateway (K/min)</th></tr></thead>
      <tbody><tr><th scope="row">22:00</th><td>24.1</td><td>9.8</td></tr><tr><th scope="row">23:00</th><td>21.8</td><td>8.7</td></tr><tr><th scope="row">00:00</th><td>18.2</td><td>7.1</td></tr><tr><th scope="row">01:00</th><td>15.9</td><td>6.2</td></tr><tr><th scope="row">02:00</th><td>14.7</td><td>5.8</td></tr><tr><th scope="row">03:00</th><td>15.2</td><td>6</td></tr><tr><th scope="row">04:00</th><td>17.9</td><td>7.4</td></tr><tr><th scope="row">05:00</th><td>22.4</td><td>9.1</td></tr><tr><th scope="row">06:00</th><td>28.6</td><td>11.6</td></tr><tr><th scope="row">07:00</th><td>33.9</td><td>12.9</td></tr><tr><th scope="row">08:00</th><td>38.2</td><td>13.2</td></tr><tr><th scope="row">09:00</th><td>41.3</td><td>12.5</td></tr></tbody>
    </table></div>
  </details>
</figure>
```

## Area and reference rule

A single series needs no legend — the title names it. The area is the series hue as a ~14% wash under its line. A `.dd-chart__rule` marks a target or SLO; label it, don’t colour it.

Try it: press Table in the corner to swap the plot for its data, and again to swap back.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">p95 latency · auth-gateway</p><p class="dd-chart__sub">Last 24 hours · milliseconds</p><p class="dd-chart__total">142 ms</p></div>
    <div class="dd-chart__actions"><button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-chart-view aria-controls="p95-table" aria-pressed="false"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-list"/></svg><span>Table</span></button><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" data-dd-chart-expand aria-haspopup="dialog" aria-label="Expand chart"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-expand"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></div>
  </figcaption>
  <div class="dd-chart__frame">
    <div class="dd-chart__y" aria-hidden="true"><span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div>
    <div class="dd-chart__plot" style="--dd-chart-ticks:5" role="group" aria-label="auth-gateway p95 latency over 24 hours, against a 200 ms SLO">
      <svg class="dd-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="dd-chart__area dd-chart-s1" d="M0 52.8 L4.2 55.2 L8.3 56.8 L12.5 58.4 L16.7 59.6 L20.8 60.4 L25 58.8 L29.2 56 L33.3 49.6 L37.5 43.6 L41.7 39.2 L45.8 36.8 L50 40.4 L54.2 14.4 L58.3 31.6 L62.5 38.4 L66.7 41.2 L70.8 39.6 L75 36 L79.2 33.6 L83.3 36.8 L87.5 40.4 L91.7 44.4 L95.8 47.6 L100 43.2 L100 100 L0 100 Z"/>
        <path class="dd-chart__line dd-chart-s1" d="M0 52.8 L4.2 55.2 L8.3 56.8 L12.5 58.4 L16.7 59.6 L20.8 60.4 L25 58.8 L29.2 56 L33.3 49.6 L37.5 43.6 L41.7 39.2 L45.8 36.8 L50 40.4 L54.2 14.4 L58.3 31.6 L62.5 38.4 L66.7 41.2 L70.8 39.6 L75 36 L79.2 33.6 L83.3 36.8 L87.5 40.4 L91.7 44.4 L95.8 47.6 L100 43.2"/>
      </svg>
      <div class="dd-chart__rule" style="--y:20"><span>SLO 200 ms</span></div>
      <span class="dd-chart__marker dd-chart-s1" style="--x:100; --y:43.2"></span>
      
      <div class="dd-chart__hits" style="--dd-chart-points:25">
        <div class="dd-chart__hit" style="--x:0" tabindex="0" role="img" aria-label="10:00: p95 118 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:52.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">10:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>118 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:4.2" tabindex="0" role="img" aria-label="11:00: p95 112 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:55.2"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">11:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>112 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:8.3" tabindex="0" role="img" aria-label="12:00: p95 108 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:56.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">12:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>108 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:12.5" tabindex="0" role="img" aria-label="13:00: p95 104 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:58.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">13:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>104 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:16.7" tabindex="0" role="img" aria-label="14:00: p95 101 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:59.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">14:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>101 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:20.8" tabindex="0" role="img" aria-label="15:00: p95 99 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:60.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">15:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>99 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:25" tabindex="0" role="img" aria-label="16:00: p95 103 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:58.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">16:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>103 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:29.2" tabindex="0" role="img" aria-label="17:00: p95 110 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:56"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">17:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>110 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:33.3" tabindex="0" role="img" aria-label="18:00: p95 126 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:49.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">18:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>126 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:37.5" tabindex="0" role="img" aria-label="19:00: p95 141 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:43.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">19:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>141 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:41.7" tabindex="0" role="img" aria-label="20:00: p95 152 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:39.2"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">20:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>152 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:45.8" tabindex="0" role="img" aria-label="21:00: p95 158 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:36.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">21:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>158 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:50" tabindex="0" role="img" aria-label="22:00: p95 149 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:40.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">22:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>149 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:54.2" tabindex="0" role="img" aria-label="23:00: p95 214 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:14.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">23:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>214 ms</b></p></div>
        </div>
        <div class="dd-chart__hit" style="--x:58.3" tabindex="0" role="img" aria-label="00:00: p95 171 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:31.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">00:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>171 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:62.5" tabindex="0" role="img" aria-label="01:00: p95 154 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:38.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">01:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>154 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:66.7" tabindex="0" role="img" aria-label="02:00: p95 147 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:41.2"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">02:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>147 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:70.8" tabindex="0" role="img" aria-label="03:00: p95 151 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:39.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">03:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>151 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:75" tabindex="0" role="img" aria-label="04:00: p95 160 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:36"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">04:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>160 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:79.2" tabindex="0" role="img" aria-label="05:00: p95 166 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:33.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">05:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>166 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:83.3" tabindex="0" role="img" aria-label="06:00: p95 158 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:36.8"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">06:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>158 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:87.5" tabindex="0" role="img" aria-label="07:00: p95 149 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:40.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">07:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>149 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:91.7" tabindex="0" role="img" aria-label="08:00: p95 139 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:44.4"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">08:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>139 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:95.8" tabindex="0" role="img" aria-label="09:00: p95 131 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:47.6"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">09:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>131 ms</b></p></div>
        </div>
        <div class="dd-chart__hit is-flip" style="--x:100" tabindex="0" role="img" aria-label="10:00: p95 142 ms">
          <span class="dd-chart__dot dd-chart-s1" style="--y:43.2"></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">10:00</p><p class="dd-chart__tip-row dd-chart-s1">p95<b>142 ms</b></p></div>
        </div>
      </div>
    </div>
    <div class="dd-chart__x dd-chart__x--points" aria-hidden="true"><span>10:00</span><span>16:00</span><span>22:00</span><span>04:00</span><span>now</span></div>
  </div>
  
  <div class="dd-chart__data dd-chart__data--swap" id="p95-table" hidden>
    <div class="dd-chart__data-scroll" tabindex="0" role="region" aria-label="auth-gateway p95 latency by hour"><table>
      <caption class="dd-visually-hidden">auth-gateway p95 latency by hour</caption>
      <thead><tr><th scope="col">Hour</th><th scope="col">p95 (ms)</th></tr></thead>
      <tbody><tr><th scope="row">10:00</th><td>118</td></tr><tr><th scope="row">11:00</th><td>112</td></tr><tr><th scope="row">12:00</th><td>108</td></tr><tr><th scope="row">13:00</th><td>104</td></tr><tr><th scope="row">14:00</th><td>101</td></tr><tr><th scope="row">15:00</th><td>99</td></tr><tr><th scope="row">16:00</th><td>103</td></tr><tr><th scope="row">17:00</th><td>110</td></tr><tr><th scope="row">18:00</th><td>126</td></tr><tr><th scope="row">19:00</th><td>141</td></tr><tr><th scope="row">20:00</th><td>152</td></tr><tr><th scope="row">21:00</th><td>158</td></tr><tr><th scope="row">22:00</th><td>149</td></tr><tr><th scope="row">23:00</th><td>214</td></tr><tr><th scope="row">00:00</th><td>171</td></tr><tr><th scope="row">01:00</th><td>154</td></tr><tr><th scope="row">02:00</th><td>147</td></tr><tr><th scope="row">03:00</th><td>151</td></tr><tr><th scope="row">04:00</th><td>160</td></tr><tr><th scope="row">05:00</th><td>166</td></tr><tr><th scope="row">06:00</th><td>158</td></tr><tr><th scope="row">07:00</th><td>149</td></tr><tr><th scope="row">08:00</th><td>139</td></tr><tr><th scope="row">09:00</th><td>131</td></tr><tr><th scope="row">10:00</th><td>142</td></tr></tbody>
    </table></div>
  </div>
</figure>
```

## Horizontal bars

For ranked categories with long names. Pure HTML: label, bar, value in mono. Below 460px the label moves above its bar.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">Busiest services</p><p class="dd-chart__sub">Requests / min · now · top 6 of 24</p></div>
  </figcaption>
  <ul class="dd-chart__hbars">
    <li class="dd-chart__hbar dd-chart-s1"><span class="dd-chart__hbar-label">edge-cache</span><span class="dd-chart__hbar-track"><span class="dd-chart__hbar-fill" style="--v:100"></span></span><span class="dd-chart__hbar-value">41,337</span></li>
    <li class="dd-chart__hbar dd-chart-s1"><span class="dd-chart__hbar-label">metrics-agg</span><span class="dd-chart__hbar-track"><span class="dd-chart__hbar-fill" style="--v:46.5"></span></span><span class="dd-chart__hbar-value">19,220</span></li>
    <li class="dd-chart__hbar dd-chart-s1"><span class="dd-chart__hbar-label">auth-gateway</span><span class="dd-chart__hbar-track"><span class="dd-chart__hbar-fill" style="--v:30.2"></span></span><span class="dd-chart__hbar-value">12,480</span></li>
    <li class="dd-chart__hbar dd-chart-s1"><span class="dd-chart__hbar-label">search-indexer</span><span class="dd-chart__hbar-track"><span class="dd-chart__hbar-fill" style="--v:21.5"></span></span><span class="dd-chart__hbar-value">8,904</span></li>
    <li class="dd-chart__hbar dd-chart-s1"><span class="dd-chart__hbar-label">image-resizer</span><span class="dd-chart__hbar-track"><span class="dd-chart__hbar-fill" style="--v:15.7"></span></span><span class="dd-chart__hbar-value">6,502</span></li>
    <li class="dd-chart__hbar dd-chart-s1"><span class="dd-chart__hbar-label">billing-worker</span><span class="dd-chart__hbar-track"><span class="dd-chart__hbar-fill" style="--v:7.8"></span></span><span class="dd-chart__hbar-value">3,212</span></li>
  </ul>
</figure>
```

## Stacked

Stacked columns show a total and its parts over time; segments are separated by a 2px surface gap, and only the top one is rounded. The tooltip adds the total.

Try it: hover or arrow through the days — the tooltip adds the total.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">Requests by region</p><p class="dd-chart__sub">Last 7 days · millions</p></div>
    <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart-s1">us-east-1</li><li class="dd-chart__key dd-chart-s2">eu-west-2</li><li class="dd-chart__key dd-chart-s3">ap-south-1</li></ul>
  </figcaption>
  <div class="dd-chart__frame">
    <div class="dd-chart__y" aria-hidden="true"><span>100M</span><span>75M</span><span>50M</span><span>25M</span><span>0</span></div>
    <div class="dd-chart__plot" role="group" aria-label="Requests per day, stacked by region">
      <div class="dd-chart__cols">
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Mon: us-east-1 42M, eu-west-2 18M, ap-south-1 11M; total 71M">
          <span class="dd-chart__stackcol" style="--v:71"><span class="dd-chart-s1" style="--v:42"></span><span class="dd-chart-s2" style="--v:18"></span><span class="dd-chart-s3" style="--v:11"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Mon, Oct 20</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>42M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>18M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>11M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>71M</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Tue: us-east-1 45M, eu-west-2 19M, ap-south-1 12M; total 76M">
          <span class="dd-chart__stackcol" style="--v:76"><span class="dd-chart-s1" style="--v:45"></span><span class="dd-chart-s2" style="--v:19"></span><span class="dd-chart-s3" style="--v:12"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Tue, Oct 21</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>45M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>19M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>12M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>76M</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Wed: us-east-1 44M, eu-west-2 21M, ap-south-1 12M; total 77M">
          <span class="dd-chart__stackcol" style="--v:77"><span class="dd-chart-s1" style="--v:44"></span><span class="dd-chart-s2" style="--v:21"></span><span class="dd-chart-s3" style="--v:12"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Wed, Oct 22</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>44M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>21M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>12M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>77M</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Thu: us-east-1 48M, eu-west-2 20M, ap-south-1 13M; total 81M">
          <span class="dd-chart__stackcol" style="--v:81"><span class="dd-chart-s1" style="--v:48"></span><span class="dd-chart-s2" style="--v:20"></span><span class="dd-chart-s3" style="--v:13"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Thu, Oct 23</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>48M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>20M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>13M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>81M</b></p></div>
        </div>
        <div class="dd-chart__slot" tabindex="0" role="img" aria-label="Fri: us-east-1 46M, eu-west-2 22M, ap-south-1 14M; total 82M">
          <span class="dd-chart__stackcol" style="--v:82"><span class="dd-chart-s1" style="--v:46"></span><span class="dd-chart-s2" style="--v:22"></span><span class="dd-chart-s3" style="--v:14"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Fri, Oct 24</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>46M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>22M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>14M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>82M</b></p></div>
        </div>
        <div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sat: us-east-1 31M, eu-west-2 12M, ap-south-1 9M; total 52M">
          <span class="dd-chart__stackcol" style="--v:52"><span class="dd-chart-s1" style="--v:31"></span><span class="dd-chart-s2" style="--v:12"></span><span class="dd-chart-s3" style="--v:9"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Sat, Oct 25</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>31M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>12M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>9M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>52M</b></p></div>
        </div>
        <div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sun: us-east-1 28M, eu-west-2 10M, ap-south-1 8M; total 46M">
          <span class="dd-chart__stackcol" style="--v:46"><span class="dd-chart-s1" style="--v:28"></span><span class="dd-chart-s2" style="--v:10"></span><span class="dd-chart-s3" style="--v:8"></span></span>
          <div class="dd-chart__tip" aria-hidden="true"><p class="dd-chart__tip-title">Sun, Oct 26</p><p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>28M</b></p><p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>10M</b></p><p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>8M</b></p><p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>46M</b></p></div>
        </div>
      </div>
    </div>
    <div class="dd-chart__x" aria-hidden="true"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
  </div>
</figure>
```

A 100% bar shows one whole split into parts. The tall bar (28px) prints each share inside in dark or light ink chosen per series; parts too narrow for a label get `.is-quiet` and leave it to the legend. The thin bar (8px) is a quiet figure for cards and quotas.

Try it: hover, tap or Tab to a segment for its name and value.

```html
<div class="dd-stack" style="--dd-gap: 20px">
  <figure class="dd-chart" data-dd-chart>
    <figcaption class="dd-chart__head">
      <div><p class="dd-chart__title">Storage by project</p><p class="dd-chart__sub">12.4 TB across 7 projects</p></div>
      <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart-s1">dawn-and-dusk</li><li class="dd-chart__key dd-chart-s2">dockey-ui</li><li class="dd-chart__key dd-chart-s3">insomnia</li><li class="dd-chart__key dd-chart-other">Other (4)</li></ul>
    </figcaption>
    <div class="dd-chart__stack" role="group" aria-label="Storage by project">
      <span class="dd-chart__seg dd-chart-s1" style="--v:5.4" tabindex="0" role="img" aria-label="dawn-and-dusk 5.4 TB, 44%" data-dd-chart-label="dawn-and-dusk" data-dd-chart-value="5.4 TB · 44%">44%</span>
      <span class="dd-chart__seg dd-chart-s2" style="--v:3.1" tabindex="0" role="img" aria-label="dockey-ui 3.1 TB, 25%" data-dd-chart-label="dockey-ui" data-dd-chart-value="3.1 TB · 25%">25%</span>
      <span class="dd-chart__seg dd-chart-s3" style="--v:2.2" tabindex="0" role="img" aria-label="insomnia 2.2 TB, 18%" data-dd-chart-label="insomnia" data-dd-chart-value="2.2 TB · 18%">18%</span>
      <span class="dd-chart__seg dd-chart-other" style="--v:1.7" tabindex="0" role="img" aria-label="Other (4) 1.7 TB, 14%" data-dd-chart-label="Other (4)" data-dd-chart-value="1.7 TB · 14%">14%</span>
    </div>
  </figure>
  <figure class="dd-chart" data-dd-chart>
    <figcaption class="dd-chart__head">
      <div><p class="dd-chart__title">Build minutes · October</p><p class="dd-chart__sub">2,397 of 3,000 included minutes</p></div>
    </figcaption>
    <div class="dd-chart__stack dd-chart__stack--thin" role="group" aria-label="Build minutes by project">
      <span class="dd-chart__seg dd-chart-s1" style="--v:1248" tabindex="0" role="img" aria-label="dawn-and-dusk 1,248 min" data-dd-chart-label="dawn-and-dusk" data-dd-chart-value="1,248 min"></span><span class="dd-chart__seg dd-chart-s2" style="--v:716" tabindex="0" role="img" aria-label="dockey-ui 716 min" data-dd-chart-label="dockey-ui" data-dd-chart-value="716 min"></span><span class="dd-chart__seg dd-chart-s3" style="--v:291" tabindex="0" role="img" aria-label="insomnia 291 min" data-dd-chart-label="insomnia" data-dd-chart-value="291 min"></span><span class="dd-chart__seg dd-chart-s4" style="--v:142" tabindex="0" role="img" aria-label="ai-focus 142 min" data-dd-chart-label="ai-focus" data-dd-chart-value="142 min"></span>
    </div>
    <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart__key--dot dd-chart-s1">dawn-and-dusk <span class="dd-chart__key-value" style="padding-left:0">1,248</span></li><li class="dd-chart__key dd-chart__key--dot dd-chart-s2">dockey-ui <span class="dd-chart__key-value" style="padding-left:0">716</span></li><li class="dd-chart__key dd-chart__key--dot dd-chart-s3">insomnia <span class="dd-chart__key-value" style="padding-left:0">291</span></li><li class="dd-chart__key dd-chart__key--dot dd-chart-s4">ai-focus <span class="dd-chart__key-value" style="padding-left:0">142</span></li></ul>
  </figure>
</div>
```

## Donut

SVG circles with `pathLength="100"`: each arc’s `stroke-dasharray` is its share minus a 0.8 gap, offset by the running total. Keep it to 3–4 parts plus “Other”, and always pair it with a legend that carries the values.

Try it: hover an arc, or Tab in and use the arrow keys.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">Storage by project</p><p class="dd-chart__sub">Object storage · all regions</p></div>
    <div class="dd-chart__actions"><button class="dd-btn dd-btn--ghost dd-btn--sm dd-btn--icon" type="button" data-dd-chart-expand aria-haspopup="dialog" aria-label="Expand chart"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-expand"/></svg><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-x"/></svg></button></div>
  </figcaption>
  <div class="dd-chart__pie">
    <div class="dd-chart__donut" role="group" aria-label="Storage by project, 12.4 TB total">
      <svg viewBox="0 0 42 42" role="none">
        <circle class="dd-chart__arc dd-chart-s1" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="42.7 57.3" stroke-dashoffset="-0.4" tabindex="0" role="img" aria-label="dawn-and-dusk 5.4 TB, 44%" data-dd-chart-label="dawn-and-dusk" data-dd-chart-value="5.4 TB · 44%"></circle>
        <circle class="dd-chart__arc dd-chart-s2" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="24.2 75.8" stroke-dashoffset="-43.9" tabindex="0" role="img" aria-label="dockey-ui 3.1 TB, 25%" data-dd-chart-label="dockey-ui" data-dd-chart-value="3.1 TB · 25%"></circle>
        <circle class="dd-chart__arc dd-chart-s3" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="16.9 83.1" stroke-dashoffset="-68.9" tabindex="0" role="img" aria-label="insomnia 2.2 TB, 18%" data-dd-chart-label="insomnia" data-dd-chart-value="2.2 TB · 18%"></circle>
        <circle class="dd-chart__arc dd-chart-other" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="12.9 87.1" stroke-dashoffset="-86.7" tabindex="0" role="img" aria-label="Other (4) 1.7 TB, 14%" data-dd-chart-label="Other (4)" data-dd-chart-value="1.7 TB · 14%"></circle>
      </svg>
      <div class="dd-chart__donut-center" aria-hidden="true"><b>12.4 TB</b><span>stored</span></div>
    </div>
    <ul class="dd-chart__legend dd-chart__legend--stack">
      <li class="dd-chart__key dd-chart-s1">dawn-and-dusk<span class="dd-chart__key-value">5.4 TB</span><span class="dd-chart__key-share">44%</span></li>
      <li class="dd-chart__key dd-chart-s2">dockey-ui<span class="dd-chart__key-value">3.1 TB</span><span class="dd-chart__key-share">25%</span></li>
      <li class="dd-chart__key dd-chart-s3">insomnia<span class="dd-chart__key-value">2.2 TB</span><span class="dd-chart__key-share">18%</span></li>
      <li class="dd-chart__key dd-chart-other">Other (4)<span class="dd-chart__key-value">1.7 TB</span><span class="dd-chart__key-share">14%</span></li>
    </ul>
  </div>
</figure>
```

## Legend

Every chart with two or more series has a legend. Keys are swatches (bars, areas), short lines (line charts) or dots (scatter, small figures); the label stays in text colour. The stacked legend adds values and shares for donuts and parts-of-a-whole.

```html
<div class="dd-stack" style="--dd-gap: 25px">
  <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart-s1">us-east-1</li><li class="dd-chart__key dd-chart-s2">eu-west-2</li><li class="dd-chart__key dd-chart-s3">ap-south-1</li></ul>
  <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart__key--line dd-chart-s1">This week</li><li class="dd-chart__key dd-chart__key--line dd-chart-other">Last week</li></ul>
  <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart__key--dot dd-chart-s1">dawn-and-dusk</li><li class="dd-chart__key dd-chart__key--dot dd-chart-s2">dockey-ui</li><li class="dd-chart__key dd-chart__key--dot dd-chart-s3">insomnia</li><li class="dd-chart__key dd-chart__key--dot dd-chart-s4">ai-focus</li></ul>
  <ul class="dd-chart__legend dd-chart__legend--stack" style="max-width: 320px">
    <li class="dd-chart__key dd-chart-s1">us-east-1<span class="dd-chart__key-value">276M</span><span class="dd-chart__key-share">58%</span></li>
    <li class="dd-chart__key dd-chart-s2">eu-west-2<span class="dd-chart__key-value">122M</span><span class="dd-chart__key-share">26%</span></li>
    <li class="dd-chart__key dd-chart-s3">ap-south-1<span class="dd-chart__key-value">79M</span><span class="dd-chart__key-share">16%</span></li>
  </ul>
</div>
```

## Tooltip

A floating layer: `--dd-float-bg` with `--dd-shadow-float`, so it lifts off the chart card in both themes. A mono title for the x value, one row per series with a key, values right-aligned in mono, and an optional total. In charts it opens beside the hovered slot or crosshair; add `.is-flip` to open it to the left near the right edge.

Pinned with .is-static for reference — the charts above show the same tooltip live.

```html
<div class="dd-row" style="--dd-gap: 20px; align-items: flex-start">
  <div class="dd-chart__tip is-static">
    <p class="dd-chart__tip-title">Thu, Oct 23 · 14:00</p>
    <p class="dd-chart__tip-row dd-chart-s1">us-east-1<b>48M</b></p>
    <p class="dd-chart__tip-row dd-chart-s2">eu-west-2<b>20M</b></p>
    <p class="dd-chart__tip-row dd-chart-s3">ap-south-1<b>13M</b></p>
    <p class="dd-chart__tip-row dd-chart__tip-row--total">Total<b>81M</b></p>
  </div>
  <div class="dd-chart__tip is-static">
    <p class="dd-chart__tip-title">06:00</p>
    <p class="dd-chart__tip-row dd-chart-s1">p95<b>126 ms</b></p>
  </div>
</div>
```

## Empty

Keep the plot height, a faint baseline and the x axis so the space still reads as a chart; drop the gridlines and say why there’s nothing, with a way forward.

Try it: Change range gives feedback here; in an app it opens the range picker.

```html
<figure class="dd-chart" data-dd-chart>
  <figcaption class="dd-chart__head">
    <div><p class="dd-chart__title">Cache hit ratio · edge-cache</p><p class="dd-chart__sub">ap-south-1 · last 7 days</p></div>
  </figcaption>
  <div class="dd-chart__frame">
    <div class="dd-chart__plot is-empty">
      <div class="dd-chart__empty"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chart"/></svg><b>No data for this range</b><span>edge-cache hasn’t reported metrics from ap-south-1 since Oct 24.</span><button class="dd-btn dd-btn--secondary dd-btn--sm" type="button" data-dd-toast="Range picker opens here" data-dd-toast-description="Pick dates before Oct 24 to see edge-cache’s last ap-south-1 metrics."><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-calendar"/></svg><span>Change range</span></button></div>
    </div>
    <div class="dd-chart__x" aria-hidden="true"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
  </div>
</figure>
```

## Colour order

Series take the Golden hour set in this fixed order — never cycled, never re-sorted by rank, and a series keeps its colour when filters remove its neighbours. The order was chosen by measuring separation (OKLab ΔE, normal vision plus protan and deutan simulation, in both modes) because the set is warm-only:

- 1–2 are clearly distinct for everyone (ΔE ≥ 13.9). 1–3 is the comfortable maximum (≥ 8.2).
- 4 series (≥ 7.4) need a legend and direct labels or a table view.
- 5 or more fall below a safe distance: fold the tail into `.dd-chart-other` (tone-2), or split into small multiples.
- Never put apricot (7) next to amber (8) — they are nearly identical (ΔE 3.1).
- Honey, sand, apricot, amber, rose and ochre are below 3:1 against the dawn background: fine as fills, weak as thin lines. Prefer terracotta (1) or wine (3) for a single line, and give light series labels or a table view.

```html
<div class="dd-stack" style="--dd-gap: 15px">
  <div class="dd-chart__stack" role="img" aria-label="Series colour order"><span class="dd-chart__seg dd-chart-s1" style="--v:1">1</span><span class="dd-chart__seg dd-chart-s2" style="--v:1">2</span><span class="dd-chart__seg dd-chart-s3" style="--v:1">3</span><span class="dd-chart__seg dd-chart-s4" style="--v:1">4</span><span class="dd-chart__seg dd-chart-s5" style="--v:1">5</span><span class="dd-chart__seg dd-chart-s6" style="--v:1">6</span><span class="dd-chart__seg dd-chart-s7" style="--v:1">7</span><span class="dd-chart__seg dd-chart-s8" style="--v:1">8</span><span class="dd-chart__seg dd-chart-other" style="--v:1">other</span></div>
  <ul class="dd-chart__legend"><li class="dd-chart__key dd-chart-s1"><b class="dd-mono" style="font-weight:500">1</b>&nbsp;terracotta · set-4</li><li class="dd-chart__key dd-chart-s2"><b class="dd-mono" style="font-weight:500">2</b>&nbsp;honey · set-1</li><li class="dd-chart__key dd-chart-s3"><b class="dd-mono" style="font-weight:500">3</b>&nbsp;wine · set-6</li><li class="dd-chart__key dd-chart-s4"><b class="dd-mono" style="font-weight:500">4</b>&nbsp;rose · set-5</li><li class="dd-chart__key dd-chart-s5"><b class="dd-mono" style="font-weight:500">5</b>&nbsp;sand · set-8</li><li class="dd-chart__key dd-chart-s6"><b class="dd-mono" style="font-weight:500">6</b>&nbsp;ochre · set-7</li><li class="dd-chart__key dd-chart-s7"><b class="dd-mono" style="font-weight:500">7</b>&nbsp;apricot · set-3</li><li class="dd-chart__key dd-chart-s8"><b class="dd-mono" style="font-weight:500">8</b>&nbsp;amber · set-2</li><li class="dd-chart__key dd-chart-other"><b class="dd-mono" style="font-weight:500">other</b>&nbsp;tone-2</li></ul>
</div>
```

## Dusk

Nothing changes in markup. The set tokens are lifted for dusk, so marks keep their contrast on dark surfaces; gridlines and the baseline are mixed from `--dd-text` and follow it; the 2px gaps and marker rings use the chart’s own surface (`--_bg`), so they cut cleanly in both modes. Ink inside a filled segment comes from `--dd-series-ink`: dark on every hue, except wine (3), which flips to light ink in dawn. Use “View in dusk” on any example above to compare.

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-chart` | Chart card on `--dd-surface`; a size container. `--dd-chart-height` sets the plot height (200px). |
| `.dd-chart--bare` | No card — for charts inside another surface. |
| `.dd-chart__head / __title / __sub / __total` | Header row: title, subtitle, optional headline figure, and the legend on the right. |
| `.dd-chart__actions` | Right side of the head: groups the legend, the Table toggle and the expand button. |
| `.dd-chart-s1 … -s8, .dd-chart-other` | Series colour. Sets `--dd-series` (and `--dd-series-ink` for text on a fill) on any mark, key or tooltip row. |
| `.dd-chart__legend / __key` | Legend list and key. `__key--line`, `__key--dot` change the swatch; `__key-value`, `__key-share` add figures. |
| `.dd-chart__legend--stack` | One key per row, values right-aligned. |
| `.dd-chart__frame` | Grid: `__y` ticks · `__plot` · optional `__end` labels, with `__x` below. |
| `.dd-chart__end` | Direct end labels for lines, each placed at its `--y`. `--dd-chart-end-width` sets the column (7.5rem). Hidden in charts under 460px. |
| `.dd-chart__y / __x` | Tick labels in mono. `__x` is a band axis (one label per slot); `__x--points` centres labels on line points. `.is-minor` ticks hide on narrow charts. |
| `.dd-chart__plot` | Plot area with hairline gridlines and a baseline. `--dd-chart-ticks` = number of intervals (4). `__plot--clean` keeps only the baseline. |
| `.dd-chart__svg` | Absolutely filled SVG; use `viewBox="0 0 100 100" preserveAspectRatio="none"`. |
| `.dd-chart__line / __area` | SVG line (2px, non-scaling) and area wash (14%). |
| `.dd-chart__gridline / __baseline / __tick` | For SVG drawn by a library: hairline gridlines, baseline and tick text. |
| `.dd-chart__marker` | HTML point marker at `--x`, `--y` (%), 8px with a 2px surface ring. |
| `.dd-chart__rule` | Labelled reference line at `--y` (target, SLO, budget). |
| `.dd-chart__cols / __slot / __col` | Column chart: one slot per x value, bars sized by `--v` (0–100). |
| `.dd-chart__stackcol` | Stacked column inside a slot: height `--v`; children are segments with `--v` as their weight. |
| `.dd-chart__hits / __hit / __dot` | Hover layer for lines: `--dd-chart-points` on the container, `--x` per hit, a dot per series at `--y`. |
| `.dd-chart__tip` | Tooltip with `__tip-title`, `__tip-row` (value in `<b>`) and `__tip-row--total`. Shown on hover/focus of a slot or hit; `.is-flip` opens it to the left; `.is-static` for a standalone tooltip. |
| `.dd-chart__hbars / __hbar` | Horizontal bar list: `__hbar-label`, `__hbar-track` > `__hbar-fill` (`--v`), `__hbar-value`. `--dd-chart-label-width` sets the label column. |
| `.dd-chart__stack / __seg` | 100% bar; segments weighted by `--v`. `__stack--thin` for the 8px form; `.is-quiet` hides a label that won’t fit. |
| `.dd-chart__pie / __donut / __arc` | Donut layout, SVG wrapper (`--dd-chart-donut` size, 168px) and arcs; `__arc-track` draws an empty ring behind them, `__donut-center` holds the total. |
| `.dd-chart__empty` | Centred empty message over a faded plot (`__plot.is-empty`). |
| `.dd-chart__data` | `<details>` “View as table” with every value; wrap the table in `__data-scroll`. `__data--swap`: a hidden container the `data-dd-chart-view` toggle swaps in for the plot. |
| `[data-dd-chart-expand]` | Icon button that opens the chart in a large dialog: the expand icon first, then a close icon (`x`) shown while expanded. Give it `aria-label` and `aria-haspopup="dialog"`. |
| `.dd-chart[data-dd-chart]` | Opts into the script: roving focus, touch and floating tooltips, table swap, expand. `.is-active` marks the current mark, `.is-table` the swapped figure, `.is-expanded` the figure in the dialog. |

## Behaviour

Charts work as static HTML: tooltips open on hover and keyboard focus with CSS alone. Add `data-dd-chart` to the `.dd-chart` figure and the script adds the rest:

- One tab stop per plot. Slots, line points (`__hit`), 100% segments (`__seg`) and donut arcs (`__arc`) — or any element with `data-dd-chart-point` — share a roving `tabindex`. ← → (or ↑ ↓) step through them, Home / End jump to the ends, Esc hides the tooltip until the next move.
- Touch. Tapping a mark opens its tooltip; tapping anywhere else closes it. Tooltips flip to the side with room.
- Floating tooltips. Marks without a `.dd-chart__tip` inside get one built from `data-dd-chart-label`, `data-dd-chart-value` and an optional `data-dd-chart-title`, keyed by the mark’s series class. Give each mark `role="img"` and an `aria-label`, and its container `role="group"`.
- Table view. A `<details class="dd-chart__data">` “View as table” needs no script. To swap the plot for its table instead, add a toggle button `data-dd-chart-view aria-pressed="false" aria-controls="ID"` and a `.dd-chart__data.dd-chart__data--swap` container with that ID and `hidden`; the figure gets `.is-table` and fires `dd:change` with `detail.view` = `"table"` or `"chart"`.
- Expand. A `data-dd-chart-expand` button opens the chart in a large dialog: the figure itself moves there, taller and wider, with a tonal placeholder holding its place on the page. Esc, the backdrop or the same button (now a ×) brings it back, and focus returns to the button. Tooltips, keyboard steps and the Table toggle keep working inside. Fires `dd:change` with `detail.expanded` while the chart is in its place on the page (just before it opens, just after it returns), so listeners on its container hear both. Because the figure moves, use it on HTML-owned markup; in React, render your own dialog.
- The active mark has `.is-active` (same look as hover); use it to style custom marks.

## Guidelines

Do:
- Pick the form from the job: columns or bars for comparing amounts, lines for change over time, a 100% bar or donut for parts of one whole, a stat for a single number.
- Assign series colours in the fixed order and keep each series’ colour when filters change.
- Label selectively: the line ends, the extreme, the one series the story is about. Let the axis, tooltip and table carry the rest.
- Round ticks to clean numbers and compact large ones on the axis (0 · 10K · 20K).
- Give every chart a name (`aria-label` or caption) and a table view.

Don't:
- Don’t use two y axes. Two measures of different scale get two charts.
- Don’t colour text with a series colour — the swatch beside it carries identity.
- Don’t reuse status colours (ok, warn, bad) as series; they mean state.
- Don’t dash gridlines or draw borders around marks; gaps and rings separate them.
- Don’t go past four series in one chart — fold the rest into “Other” or use small multiples.

