# chart — `chart`

Conventions for charts in dawn & dusk: recessive axes and grid, thin marks, the Golden hour series in a fixed order, and text that never wears a series colour. Static HTML and inline SVG — the same classes style SVG from D3 or any charting library.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/chart

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">Build minutes per day&#x3C;/p>&#x3C;p class="dd-chart__sub">Last 7 days · minutes on shared runners&#x3C;/p>&#x3C;/div>
    &#x3C;ul class="dd-chart__legend">&#x3C;li class="dd-chart__key dd-chart-s1">dawn-and-dusk&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart-s2">dockey-ui&#x3C;/li>&#x3C;/ul>
  &#x3C;/figcaption>
  &#x3C;div class="dd-chart__frame">
    &#x3C;div class="dd-chart__y" aria-hidden="true">&#x3C;span>80&#x3C;/span>&#x3C;span>60&#x3C;/span>&#x3C;span>40&#x3C;/span>&#x3C;span>20&#x3C;/span>&#x3C;span>0&#x3C;/span>&#x3C;/div>
    &#x3C;div class="dd-chart__plot" role="group" aria-label="Build minutes per day, by project">
      &#x3C;div class="dd-chart__cols">
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Mon Oct 20: dawn-and-dusk 42 min, dockey-ui 31 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:52.5">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:38.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Mon, Oct 20&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>42 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>31 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Tue Oct 21: dawn-and-dusk 58 min, dockey-ui 40 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:72.5">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:50">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Tue, Oct 21&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>58 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>40 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Wed Oct 22: dawn-and-dusk 35 min, dockey-ui 44 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:43.8">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:55">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Wed, Oct 22&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>35 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>44 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Thu Oct 23: dawn-and-dusk 66 min, dockey-ui 29 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:82.5">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:36.3">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Thu, Oct 23&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>66 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>29 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Fri Oct 24: dawn-and-dusk 51 min, dockey-ui 47 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:63.7">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:58.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Fri, Oct 24&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>51 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>47 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sat Oct 25: dawn-and-dusk 18 min, dockey-ui 9 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:22.5">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:11.3">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Sat, Oct 25&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>18 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>9 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sun Oct 26: dawn-and-dusk 12 min, dockey-ui 6 min">
          &#x3C;span class="dd-chart__col dd-chart-s1" style="--v:15">&#x3C;/span>&#x3C;span class="dd-chart__col dd-chart-s2" style="--v:7.5">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Sun, Oct 26&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">dawn-and-dusk&#x3C;b>12 min&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">dockey-ui&#x3C;b>6 min&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
      &#x3C;/div>
    &#x3C;/div>
    &#x3C;div class="dd-chart__x" aria-hidden="true">&#x3C;span>Mon&#x3C;/span>&#x3C;span>Tue&#x3C;/span>&#x3C;span>Wed&#x3C;/span>&#x3C;span>Thu&#x3C;/span>&#x3C;span>Fri&#x3C;/span>&#x3C;span>Sat&#x3C;/span>&#x3C;span>Sun&#x3C;/span>&#x3C;/div>
  &#x3C;/div>
  
  &#x3C;details class="dd-chart__data">
    &#x3C;summary>View as table&#x3C;/summary>
    &#x3C;div class="dd-chart__data-scroll">&#x3C;table>
      &#x3C;caption class="dd-visually-hidden">Build minutes per day, by project&#x3C;/caption>
      &#x3C;thead>&#x3C;tr>&#x3C;th scope="col">Day&#x3C;/th>&#x3C;th scope="col">dawn-and-dusk&#x3C;/th>&#x3C;th scope="col">dockey-ui&#x3C;/th>&#x3C;/tr>&#x3C;/thead>
      &#x3C;tbody>&#x3C;tr>&#x3C;th scope="row">Mon Oct 20&#x3C;/th>&#x3C;td>42&#x3C;/td>&#x3C;td>31&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">Tue Oct 21&#x3C;/th>&#x3C;td>58&#x3C;/td>&#x3C;td>40&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">Wed Oct 22&#x3C;/th>&#x3C;td>35&#x3C;/td>&#x3C;td>44&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">Thu Oct 23&#x3C;/th>&#x3C;td>66&#x3C;/td>&#x3C;td>29&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">Fri Oct 24&#x3C;/th>&#x3C;td>51&#x3C;/td>&#x3C;td>47&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">Sat Oct 25&#x3C;/th>&#x3C;td>18&#x3C;/td>&#x3C;td>9&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">Sun Oct 26&#x3C;/th>&#x3C;td>12&#x3C;/td>&#x3C;td>6&#x3C;/td>&#x3C;/tr>&#x3C;/tbody>
    &#x3C;/table>&#x3C;/div>
  &#x3C;/details>
&#x3C;/figure>
```

## Line

Lines are inline SVG on a 0–100 viewBox with `preserveAspectRatio="none"`, so the plot stretches to any width while `vector-effect: non-scaling-stroke` keeps every line at 2px. Markers, crosshair and end labels are HTML positioned by `--x` / `--y` percentages, so they stay round. End labels drop out on narrow cards — the legend stays.

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">Requests / min&#x3C;/p>&#x3C;p class="dd-chart__sub">Last 12 hours · us-east-1&#x3C;/p>&#x3C;/div>
    &#x3C;ul class="dd-chart__legend">&#x3C;li class="dd-chart__key dd-chart__key--line dd-chart-s1">edge-cache&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart__key--line dd-chart-s2">auth-gateway&#x3C;/li>&#x3C;/ul>
  &#x3C;/figcaption>
  &#x3C;div class="dd-chart__frame">
    &#x3C;div class="dd-chart__y" aria-hidden="true">&#x3C;span>50K&#x3C;/span>&#x3C;span>40K&#x3C;/span>&#x3C;span>30K&#x3C;/span>&#x3C;span>20K&#x3C;/span>&#x3C;span>10K&#x3C;/span>&#x3C;span>0&#x3C;/span>&#x3C;/div>
    &#x3C;div class="dd-chart__plot" style="--dd-chart-ticks:5" role="group" aria-label="Requests per minute over the last 12 hours">
      &#x3C;svg class="dd-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        &#x3C;path class="dd-chart__line dd-chart-s1" d="M0 51.8 L9.1 56.4 L18.2 63.6 L27.3 68.2 L36.4 70.6 L45.5 69.6 L54.5 64.2 L63.6 55.2 L72.7 42.8 L81.8 32.2 L90.9 23.6 L100 17.4"/>
        &#x3C;path class="dd-chart__line dd-chart-s2" d="M0 80.4 L9.1 82.6 L18.2 85.8 L27.3 87.6 L36.4 88.4 L45.5 88 L54.5 85.2 L63.6 81.8 L72.7 76.8 L81.8 74.2 L90.9 73.6 L100 75"/>
      &#x3C;/svg>
      &#x3C;span class="dd-chart__marker dd-chart-s1" style="--x:100; --y:17.4">&#x3C;/span>&#x3C;span class="dd-chart__marker dd-chart-s2" style="--x:100; --y:75">&#x3C;/span>
      
      &#x3C;div class="dd-chart__hits" style="--dd-chart-points:12">
        &#x3C;div class="dd-chart__hit" style="--x:0" tabindex="0" role="img" aria-label="22:00: edge-cache 24.1K, auth-gateway 9.8K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:51.8">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:80.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">22:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>24.1K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>9.8K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:9.1" tabindex="0" role="img" aria-label="23:00: edge-cache 21.8K, auth-gateway 8.7K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:56.4">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:82.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">23:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>21.8K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>8.7K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:18.2" tabindex="0" role="img" aria-label="00:00: edge-cache 18.2K, auth-gateway 7.1K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:63.6">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:85.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">00:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>18.2K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>7.1K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:27.3" tabindex="0" role="img" aria-label="01:00: edge-cache 15.9K, auth-gateway 6.2K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:68.2">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:87.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">01:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>15.9K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>6.2K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:36.4" tabindex="0" role="img" aria-label="02:00: edge-cache 14.7K, auth-gateway 5.8K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:70.6">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:88.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">02:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>14.7K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>5.8K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:45.5" tabindex="0" role="img" aria-label="03:00: edge-cache 15.2K, auth-gateway 6K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:69.6">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:88">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">03:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>15.2K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>6K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:54.5" tabindex="0" role="img" aria-label="04:00: edge-cache 17.9K, auth-gateway 7.4K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:64.2">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:85.2">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">04:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>17.9K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>7.4K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:63.6" tabindex="0" role="img" aria-label="05:00: edge-cache 22.4K, auth-gateway 9.1K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:55.2">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:81.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">05:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>22.4K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>9.1K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:72.7" tabindex="0" role="img" aria-label="06:00: edge-cache 28.6K, auth-gateway 11.6K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:42.8">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:76.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">06:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>28.6K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>11.6K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:81.8" tabindex="0" role="img" aria-label="07:00: edge-cache 33.9K, auth-gateway 12.9K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:32.2">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:74.2">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">07:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>33.9K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>12.9K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:90.9" tabindex="0" role="img" aria-label="08:00: edge-cache 38.2K, auth-gateway 13.2K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:23.6">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:73.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">08:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>38.2K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>13.2K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:100" tabindex="0" role="img" aria-label="09:00: edge-cache 41.3K, auth-gateway 12.5K">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:17.4">&#x3C;/span>&#x3C;span class="dd-chart__dot dd-chart-s2" style="--y:75">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">09:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">edge-cache&#x3C;b>41.3K&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">auth-gateway&#x3C;b>12.5K&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
      &#x3C;/div>
    &#x3C;/div>
    &#x3C;div class="dd-chart__end" aria-hidden="true">&#x3C;span class="dd-chart-s1" style="--y:17.4">edge-cache &#x3C;b>41.3K&#x3C;/b>&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--y:75">auth-gateway &#x3C;b>12.5K&#x3C;/b>&#x3C;/span>&#x3C;/div>
    &#x3C;div class="dd-chart__x dd-chart__x--points" aria-hidden="true">&#x3C;span>22:00&#x3C;/span>&#x3C;span class="is-minor">23:00&#x3C;/span>&#x3C;span class="is-minor">00:00&#x3C;/span>&#x3C;span>01:00&#x3C;/span>&#x3C;span class="is-minor">02:00&#x3C;/span>&#x3C;span class="is-minor">03:00&#x3C;/span>&#x3C;span>04:00&#x3C;/span>&#x3C;span class="is-minor">05:00&#x3C;/span>&#x3C;span class="is-minor">06:00&#x3C;/span>&#x3C;span>07:00&#x3C;/span>&#x3C;span class="is-minor">08:00&#x3C;/span>&#x3C;span class="is-minor">09:00&#x3C;/span>&#x3C;/div>
  &#x3C;/div>
  
  &#x3C;details class="dd-chart__data">
    &#x3C;summary>View as table&#x3C;/summary>
    &#x3C;div class="dd-chart__data-scroll">&#x3C;table>
      &#x3C;caption class="dd-visually-hidden">Requests per minute, last 12 hours&#x3C;/caption>
      &#x3C;thead>&#x3C;tr>&#x3C;th scope="col">Hour&#x3C;/th>&#x3C;th scope="col">edge-cache (K/min)&#x3C;/th>&#x3C;th scope="col">auth-gateway (K/min)&#x3C;/th>&#x3C;/tr>&#x3C;/thead>
      &#x3C;tbody>&#x3C;tr>&#x3C;th scope="row">22:00&#x3C;/th>&#x3C;td>24.1&#x3C;/td>&#x3C;td>9.8&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">23:00&#x3C;/th>&#x3C;td>21.8&#x3C;/td>&#x3C;td>8.7&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">00:00&#x3C;/th>&#x3C;td>18.2&#x3C;/td>&#x3C;td>7.1&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">01:00&#x3C;/th>&#x3C;td>15.9&#x3C;/td>&#x3C;td>6.2&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">02:00&#x3C;/th>&#x3C;td>14.7&#x3C;/td>&#x3C;td>5.8&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">03:00&#x3C;/th>&#x3C;td>15.2&#x3C;/td>&#x3C;td>6&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">04:00&#x3C;/th>&#x3C;td>17.9&#x3C;/td>&#x3C;td>7.4&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">05:00&#x3C;/th>&#x3C;td>22.4&#x3C;/td>&#x3C;td>9.1&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">06:00&#x3C;/th>&#x3C;td>28.6&#x3C;/td>&#x3C;td>11.6&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">07:00&#x3C;/th>&#x3C;td>33.9&#x3C;/td>&#x3C;td>12.9&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">08:00&#x3C;/th>&#x3C;td>38.2&#x3C;/td>&#x3C;td>13.2&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">09:00&#x3C;/th>&#x3C;td>41.3&#x3C;/td>&#x3C;td>12.5&#x3C;/td>&#x3C;/tr>&#x3C;/tbody>
    &#x3C;/table>&#x3C;/div>
  &#x3C;/details>
&#x3C;/figure>
```

## Area and reference rule

A single series needs no legend — the title names it. The area is the series hue as a ~14% wash under its line. A `.dd-chart__rule` marks a target or SLO; label it, don’t colour it.

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">p95 latency · auth-gateway&#x3C;/p>&#x3C;p class="dd-chart__sub">Last 24 hours · milliseconds&#x3C;/p>&#x3C;p class="dd-chart__total">142 ms&#x3C;/p>&#x3C;/div>
    &#x3C;button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-chart-view aria-controls="p95-table" aria-pressed="false">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-list"/>&#x3C;/svg>&#x3C;span>Table&#x3C;/span>&#x3C;/button>
  &#x3C;/figcaption>
  &#x3C;div class="dd-chart__frame">
    &#x3C;div class="dd-chart__y" aria-hidden="true">&#x3C;span>250&#x3C;/span>&#x3C;span>200&#x3C;/span>&#x3C;span>150&#x3C;/span>&#x3C;span>100&#x3C;/span>&#x3C;span>50&#x3C;/span>&#x3C;span>0&#x3C;/span>&#x3C;/div>
    &#x3C;div class="dd-chart__plot" style="--dd-chart-ticks:5" role="group" aria-label="auth-gateway p95 latency over 24 hours, against a 200 ms SLO">
      &#x3C;svg class="dd-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        &#x3C;path class="dd-chart__area dd-chart-s1" d="M0 52.8 L4.2 55.2 L8.3 56.8 L12.5 58.4 L16.7 59.6 L20.8 60.4 L25 58.8 L29.2 56 L33.3 49.6 L37.5 43.6 L41.7 39.2 L45.8 36.8 L50 40.4 L54.2 14.4 L58.3 31.6 L62.5 38.4 L66.7 41.2 L70.8 39.6 L75 36 L79.2 33.6 L83.3 36.8 L87.5 40.4 L91.7 44.4 L95.8 47.6 L100 43.2 L100 100 L0 100 Z"/>
        &#x3C;path class="dd-chart__line dd-chart-s1" d="M0 52.8 L4.2 55.2 L8.3 56.8 L12.5 58.4 L16.7 59.6 L20.8 60.4 L25 58.8 L29.2 56 L33.3 49.6 L37.5 43.6 L41.7 39.2 L45.8 36.8 L50 40.4 L54.2 14.4 L58.3 31.6 L62.5 38.4 L66.7 41.2 L70.8 39.6 L75 36 L79.2 33.6 L83.3 36.8 L87.5 40.4 L91.7 44.4 L95.8 47.6 L100 43.2"/>
      &#x3C;/svg>
      &#x3C;div class="dd-chart__rule" style="--y:20">&#x3C;span>SLO 200 ms&#x3C;/span>&#x3C;/div>
      &#x3C;span class="dd-chart__marker dd-chart-s1" style="--x:100; --y:43.2">&#x3C;/span>
      
      &#x3C;div class="dd-chart__hits" style="--dd-chart-points:25">
        &#x3C;div class="dd-chart__hit" style="--x:0" tabindex="0" role="img" aria-label="10:00: p95 118 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:52.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">10:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>118 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:4.2" tabindex="0" role="img" aria-label="11:00: p95 112 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:55.2">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">11:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>112 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:8.3" tabindex="0" role="img" aria-label="12:00: p95 108 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:56.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">12:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>108 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:12.5" tabindex="0" role="img" aria-label="13:00: p95 104 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:58.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">13:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>104 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:16.7" tabindex="0" role="img" aria-label="14:00: p95 101 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:59.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">14:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>101 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:20.8" tabindex="0" role="img" aria-label="15:00: p95 99 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:60.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">15:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>99 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:25" tabindex="0" role="img" aria-label="16:00: p95 103 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:58.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">16:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>103 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:29.2" tabindex="0" role="img" aria-label="17:00: p95 110 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:56">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">17:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>110 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:33.3" tabindex="0" role="img" aria-label="18:00: p95 126 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:49.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">18:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>126 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:37.5" tabindex="0" role="img" aria-label="19:00: p95 141 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:43.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">19:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>141 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:41.7" tabindex="0" role="img" aria-label="20:00: p95 152 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:39.2">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">20:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>152 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:45.8" tabindex="0" role="img" aria-label="21:00: p95 158 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:36.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">21:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>158 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:50" tabindex="0" role="img" aria-label="22:00: p95 149 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:40.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">22:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>149 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:54.2" tabindex="0" role="img" aria-label="23:00: p95 214 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:14.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">23:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>214 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit" style="--x:58.3" tabindex="0" role="img" aria-label="00:00: p95 171 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:31.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">00:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>171 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:62.5" tabindex="0" role="img" aria-label="01:00: p95 154 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:38.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">01:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>154 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:66.7" tabindex="0" role="img" aria-label="02:00: p95 147 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:41.2">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">02:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>147 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:70.8" tabindex="0" role="img" aria-label="03:00: p95 151 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:39.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">03:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>151 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:75" tabindex="0" role="img" aria-label="04:00: p95 160 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:36">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">04:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>160 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:79.2" tabindex="0" role="img" aria-label="05:00: p95 166 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:33.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">05:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>166 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:83.3" tabindex="0" role="img" aria-label="06:00: p95 158 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:36.8">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">06:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>158 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:87.5" tabindex="0" role="img" aria-label="07:00: p95 149 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:40.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">07:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>149 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:91.7" tabindex="0" role="img" aria-label="08:00: p95 139 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:44.4">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">08:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>139 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:95.8" tabindex="0" role="img" aria-label="09:00: p95 131 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:47.6">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">09:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>131 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__hit is-flip" style="--x:100" tabindex="0" role="img" aria-label="10:00: p95 142 ms">
          &#x3C;span class="dd-chart__dot dd-chart-s1" style="--y:43.2">&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">10:00&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">p95&#x3C;b>142 ms&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
      &#x3C;/div>
    &#x3C;/div>
    &#x3C;div class="dd-chart__x dd-chart__x--points" aria-hidden="true">&#x3C;span>10:00&#x3C;/span>&#x3C;span>16:00&#x3C;/span>&#x3C;span>22:00&#x3C;/span>&#x3C;span>04:00&#x3C;/span>&#x3C;span>now&#x3C;/span>&#x3C;/div>
  &#x3C;/div>
  
  &#x3C;div class="dd-chart__data dd-chart__data--swap" id="p95-table" hidden>
    &#x3C;div class="dd-chart__data-scroll" tabindex="0" role="region" aria-label="auth-gateway p95 latency by hour">&#x3C;table>
      &#x3C;caption class="dd-visually-hidden">auth-gateway p95 latency by hour&#x3C;/caption>
      &#x3C;thead>&#x3C;tr>&#x3C;th scope="col">Hour&#x3C;/th>&#x3C;th scope="col">p95 (ms)&#x3C;/th>&#x3C;/tr>&#x3C;/thead>
      &#x3C;tbody>&#x3C;tr>&#x3C;th scope="row">10:00&#x3C;/th>&#x3C;td>118&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">11:00&#x3C;/th>&#x3C;td>112&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">12:00&#x3C;/th>&#x3C;td>108&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">13:00&#x3C;/th>&#x3C;td>104&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">14:00&#x3C;/th>&#x3C;td>101&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">15:00&#x3C;/th>&#x3C;td>99&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">16:00&#x3C;/th>&#x3C;td>103&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">17:00&#x3C;/th>&#x3C;td>110&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">18:00&#x3C;/th>&#x3C;td>126&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">19:00&#x3C;/th>&#x3C;td>141&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">20:00&#x3C;/th>&#x3C;td>152&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">21:00&#x3C;/th>&#x3C;td>158&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">22:00&#x3C;/th>&#x3C;td>149&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">23:00&#x3C;/th>&#x3C;td>214&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">00:00&#x3C;/th>&#x3C;td>171&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">01:00&#x3C;/th>&#x3C;td>154&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">02:00&#x3C;/th>&#x3C;td>147&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">03:00&#x3C;/th>&#x3C;td>151&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">04:00&#x3C;/th>&#x3C;td>160&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">05:00&#x3C;/th>&#x3C;td>166&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">06:00&#x3C;/th>&#x3C;td>158&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">07:00&#x3C;/th>&#x3C;td>149&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">08:00&#x3C;/th>&#x3C;td>139&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">09:00&#x3C;/th>&#x3C;td>131&#x3C;/td>&#x3C;/tr>&#x3C;tr>&#x3C;th scope="row">10:00&#x3C;/th>&#x3C;td>142&#x3C;/td>&#x3C;/tr>&#x3C;/tbody>
    &#x3C;/table>&#x3C;/div>
  &#x3C;/div>
&#x3C;/figure>
```

## Horizontal bars

For ranked categories with long names. Pure HTML: label, bar, value in mono. Below 460px the label moves above its bar.

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">Busiest services&#x3C;/p>&#x3C;p class="dd-chart__sub">Requests / min · now · top 6 of 24&#x3C;/p>&#x3C;/div>
  &#x3C;/figcaption>
  &#x3C;ul class="dd-chart__hbars">
    &#x3C;li class="dd-chart__hbar dd-chart-s1">&#x3C;span class="dd-chart__hbar-label">edge-cache&#x3C;/span>&#x3C;span class="dd-chart__hbar-track">&#x3C;span class="dd-chart__hbar-fill" style="--v:100">&#x3C;/span>&#x3C;/span>&#x3C;span class="dd-chart__hbar-value">41,337&#x3C;/span>&#x3C;/li>
    &#x3C;li class="dd-chart__hbar dd-chart-s1">&#x3C;span class="dd-chart__hbar-label">metrics-agg&#x3C;/span>&#x3C;span class="dd-chart__hbar-track">&#x3C;span class="dd-chart__hbar-fill" style="--v:46.5">&#x3C;/span>&#x3C;/span>&#x3C;span class="dd-chart__hbar-value">19,220&#x3C;/span>&#x3C;/li>
    &#x3C;li class="dd-chart__hbar dd-chart-s1">&#x3C;span class="dd-chart__hbar-label">auth-gateway&#x3C;/span>&#x3C;span class="dd-chart__hbar-track">&#x3C;span class="dd-chart__hbar-fill" style="--v:30.2">&#x3C;/span>&#x3C;/span>&#x3C;span class="dd-chart__hbar-value">12,480&#x3C;/span>&#x3C;/li>
    &#x3C;li class="dd-chart__hbar dd-chart-s1">&#x3C;span class="dd-chart__hbar-label">search-indexer&#x3C;/span>&#x3C;span class="dd-chart__hbar-track">&#x3C;span class="dd-chart__hbar-fill" style="--v:21.5">&#x3C;/span>&#x3C;/span>&#x3C;span class="dd-chart__hbar-value">8,904&#x3C;/span>&#x3C;/li>
    &#x3C;li class="dd-chart__hbar dd-chart-s1">&#x3C;span class="dd-chart__hbar-label">image-resizer&#x3C;/span>&#x3C;span class="dd-chart__hbar-track">&#x3C;span class="dd-chart__hbar-fill" style="--v:15.7">&#x3C;/span>&#x3C;/span>&#x3C;span class="dd-chart__hbar-value">6,502&#x3C;/span>&#x3C;/li>
    &#x3C;li class="dd-chart__hbar dd-chart-s1">&#x3C;span class="dd-chart__hbar-label">billing-worker&#x3C;/span>&#x3C;span class="dd-chart__hbar-track">&#x3C;span class="dd-chart__hbar-fill" style="--v:7.8">&#x3C;/span>&#x3C;/span>&#x3C;span class="dd-chart__hbar-value">3,212&#x3C;/span>&#x3C;/li>
  &#x3C;/ul>
&#x3C;/figure>
```

## Stacked

Stacked columns show a total and its parts over time; segments are separated by a 2px surface gap, and only the top one is rounded. The tooltip adds the total.

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">Requests by region&#x3C;/p>&#x3C;p class="dd-chart__sub">Last 7 days · millions&#x3C;/p>&#x3C;/div>
    &#x3C;ul class="dd-chart__legend">&#x3C;li class="dd-chart__key dd-chart-s1">us-east-1&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart-s2">eu-west-2&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart-s3">ap-south-1&#x3C;/li>&#x3C;/ul>
  &#x3C;/figcaption>
  &#x3C;div class="dd-chart__frame">
    &#x3C;div class="dd-chart__y" aria-hidden="true">&#x3C;span>100M&#x3C;/span>&#x3C;span>75M&#x3C;/span>&#x3C;span>50M&#x3C;/span>&#x3C;span>25M&#x3C;/span>&#x3C;span>0&#x3C;/span>&#x3C;/div>
    &#x3C;div class="dd-chart__plot" role="group" aria-label="Requests per day, stacked by region">
      &#x3C;div class="dd-chart__cols">
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Mon: us-east-1 42M, eu-west-2 18M, ap-south-1 11M; total 71M">
          &#x3C;span class="dd-chart__stackcol" style="--v:71">&#x3C;span class="dd-chart-s1" style="--v:42">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:18">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:11">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Mon, Oct 20&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>42M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>18M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>11M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>71M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Tue: us-east-1 45M, eu-west-2 19M, ap-south-1 12M; total 76M">
          &#x3C;span class="dd-chart__stackcol" style="--v:76">&#x3C;span class="dd-chart-s1" style="--v:45">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:19">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:12">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Tue, Oct 21&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>45M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>19M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>12M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>76M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Wed: us-east-1 44M, eu-west-2 21M, ap-south-1 12M; total 77M">
          &#x3C;span class="dd-chart__stackcol" style="--v:77">&#x3C;span class="dd-chart-s1" style="--v:44">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:21">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:12">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Wed, Oct 22&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>44M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>21M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>12M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>77M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Thu: us-east-1 48M, eu-west-2 20M, ap-south-1 13M; total 81M">
          &#x3C;span class="dd-chart__stackcol" style="--v:81">&#x3C;span class="dd-chart-s1" style="--v:48">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:20">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:13">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Thu, Oct 23&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>48M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>20M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>13M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>81M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot" tabindex="0" role="img" aria-label="Fri: us-east-1 46M, eu-west-2 22M, ap-south-1 14M; total 82M">
          &#x3C;span class="dd-chart__stackcol" style="--v:82">&#x3C;span class="dd-chart-s1" style="--v:46">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:22">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:14">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Fri, Oct 24&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>46M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>22M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>14M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>82M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sat: us-east-1 31M, eu-west-2 12M, ap-south-1 9M; total 52M">
          &#x3C;span class="dd-chart__stackcol" style="--v:52">&#x3C;span class="dd-chart-s1" style="--v:31">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:12">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:9">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Sat, Oct 25&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>31M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>12M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>9M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>52M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
        &#x3C;div class="dd-chart__slot is-flip" tabindex="0" role="img" aria-label="Sun: us-east-1 28M, eu-west-2 10M, ap-south-1 8M; total 46M">
          &#x3C;span class="dd-chart__stackcol" style="--v:46">&#x3C;span class="dd-chart-s1" style="--v:28">&#x3C;/span>&#x3C;span class="dd-chart-s2" style="--v:10">&#x3C;/span>&#x3C;span class="dd-chart-s3" style="--v:8">&#x3C;/span>&#x3C;/span>
          &#x3C;div class="dd-chart__tip" aria-hidden="true">&#x3C;p class="dd-chart__tip-title">Sun, Oct 26&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s1">us-east-1&#x3C;b>28M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s2">eu-west-2&#x3C;b>10M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart-s3">ap-south-1&#x3C;b>8M&#x3C;/b>&#x3C;/p>&#x3C;p class="dd-chart__tip-row dd-chart__tip-row--total">Total&#x3C;b>46M&#x3C;/b>&#x3C;/p>&#x3C;/div>
        &#x3C;/div>
      &#x3C;/div>
    &#x3C;/div>
    &#x3C;div class="dd-chart__x" aria-hidden="true">&#x3C;span>Mon&#x3C;/span>&#x3C;span>Tue&#x3C;/span>&#x3C;span>Wed&#x3C;/span>&#x3C;span>Thu&#x3C;/span>&#x3C;span>Fri&#x3C;/span>&#x3C;span>Sat&#x3C;/span>&#x3C;span>Sun&#x3C;/span>&#x3C;/div>
  &#x3C;/div>
&#x3C;/figure>
```

A 100% bar shows one whole split into parts. The tall bar (28px) prints each share inside in dark or light ink chosen per series; parts too narrow for a label get `.is-quiet` and leave it to the legend. The thin bar (8px) is a quiet figure for cards and quotas.

```html
&#x3C;div class="dd-stack" style="--dd-gap: 20px">
  &#x3C;figure class="dd-chart" data-dd-chart>
    &#x3C;figcaption class="dd-chart__head">
      &#x3C;div>&#x3C;p class="dd-chart__title">Storage by project&#x3C;/p>&#x3C;p class="dd-chart__sub">12.4 TB across 7 projects&#x3C;/p>&#x3C;/div>
      &#x3C;ul class="dd-chart__legend">&#x3C;li class="dd-chart__key dd-chart-s1">dawn-and-dusk&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart-s2">dockey-ui&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart-s3">insomnia&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart-other">Other (4)&#x3C;/li>&#x3C;/ul>
    &#x3C;/figcaption>
    &#x3C;div class="dd-chart__stack" role="group" aria-label="Storage by project">
      &#x3C;span class="dd-chart__seg dd-chart-s1" style="--v:5.4" tabindex="0" role="img" aria-label="dawn-and-dusk 5.4 TB, 44%" data-dd-chart-label="dawn-and-dusk" data-dd-chart-value="5.4 TB · 44%">44%&#x3C;/span>
      &#x3C;span class="dd-chart__seg dd-chart-s2" style="--v:3.1" tabindex="0" role="img" aria-label="dockey-ui 3.1 TB, 25%" data-dd-chart-label="dockey-ui" data-dd-chart-value="3.1 TB · 25%">25%&#x3C;/span>
      &#x3C;span class="dd-chart__seg dd-chart-s3" style="--v:2.2" tabindex="0" role="img" aria-label="insomnia 2.2 TB, 18%" data-dd-chart-label="insomnia" data-dd-chart-value="2.2 TB · 18%">18%&#x3C;/span>
      &#x3C;span class="dd-chart__seg dd-chart-other" style="--v:1.7" tabindex="0" role="img" aria-label="Other (4) 1.7 TB, 14%" data-dd-chart-label="Other (4)" data-dd-chart-value="1.7 TB · 14%">14%&#x3C;/span>
    &#x3C;/div>
  &#x3C;/figure>
  &#x3C;figure class="dd-chart" data-dd-chart>
    &#x3C;figcaption class="dd-chart__head">
      &#x3C;div>&#x3C;p class="dd-chart__title">Build minutes · October&#x3C;/p>&#x3C;p class="dd-chart__sub">2,397 of 3,000 included minutes&#x3C;/p>&#x3C;/div>
    &#x3C;/figcaption>
    &#x3C;div class="dd-chart__stack dd-chart__stack--thin" role="group" aria-label="Build minutes by project">
      &#x3C;span class="dd-chart__seg dd-chart-s1" style="--v:1248" tabindex="0" role="img" aria-label="dawn-and-dusk 1,248 min" data-dd-chart-label="dawn-and-dusk" data-dd-chart-value="1,248 min">&#x3C;/span>&#x3C;span class="dd-chart__seg dd-chart-s2" style="--v:716" tabindex="0" role="img" aria-label="dockey-ui 716 min" data-dd-chart-label="dockey-ui" data-dd-chart-value="716 min">&#x3C;/span>&#x3C;span class="dd-chart__seg dd-chart-s3" style="--v:291" tabindex="0" role="img" aria-label="insomnia 291 min" data-dd-chart-label="insomnia" data-dd-chart-value="291 min">&#x3C;/span>&#x3C;span class="dd-chart__seg dd-chart-s4" style="--v:142" tabindex="0" role="img" aria-label="ai-focus 142 min" data-dd-chart-label="ai-focus" data-dd-chart-value="142 min">&#x3C;/span>
    &#x3C;/div>
    &#x3C;ul class="dd-chart__legend">&#x3C;li class="dd-chart__key dd-chart__key--dot dd-chart-s1">dawn-and-dusk &#x3C;span class="dd-chart__key-value" style="padding-left:0">1,248&#x3C;/span>&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart__key--dot dd-chart-s2">dockey-ui &#x3C;span class="dd-chart__key-value" style="padding-left:0">716&#x3C;/span>&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart__key--dot dd-chart-s3">insomnia &#x3C;span class="dd-chart__key-value" style="padding-left:0">291&#x3C;/span>&#x3C;/li>&#x3C;li class="dd-chart__key dd-chart__key--dot dd-chart-s4">ai-focus &#x3C;span class="dd-chart__key-value" style="padding-left:0">142&#x3C;/span>&#x3C;/li>&#x3C;/ul>
  &#x3C;/figure>
&#x3C;/div>
```

## Donut

SVG circles with `pathLength="100"`: each arc’s `stroke-dasharray` is its share minus a 0.8 gap, offset by the running total. Keep it to 3–4 parts plus “Other”, and always pair it with a legend that carries the values.

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">Storage by project&#x3C;/p>&#x3C;p class="dd-chart__sub">Object storage · all regions&#x3C;/p>&#x3C;/div>
  &#x3C;/figcaption>
  &#x3C;div class="dd-chart__pie">
    &#x3C;div class="dd-chart__donut" role="group" aria-label="Storage by project, 12.4 TB total">
      &#x3C;svg viewBox="0 0 42 42" role="none">
        &#x3C;circle class="dd-chart__arc dd-chart-s1" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="42.7 57.3" stroke-dashoffset="-0.4" tabindex="0" role="img" aria-label="dawn-and-dusk 5.4 TB, 44%" data-dd-chart-label="dawn-and-dusk" data-dd-chart-value="5.4 TB · 44%">&#x3C;/circle>
        &#x3C;circle class="dd-chart__arc dd-chart-s2" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="24.2 75.8" stroke-dashoffset="-43.9" tabindex="0" role="img" aria-label="dockey-ui 3.1 TB, 25%" data-dd-chart-label="dockey-ui" data-dd-chart-value="3.1 TB · 25%">&#x3C;/circle>
        &#x3C;circle class="dd-chart__arc dd-chart-s3" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="16.9 83.1" stroke-dashoffset="-68.9" tabindex="0" role="img" aria-label="insomnia 2.2 TB, 18%" data-dd-chart-label="insomnia" data-dd-chart-value="2.2 TB · 18%">&#x3C;/circle>
        &#x3C;circle class="dd-chart__arc dd-chart-other" cx="21" cy="21" r="15.9155" pathLength="100" stroke-dasharray="12.9 87.1" stroke-dashoffset="-86.7" tabindex="0" role="img" aria-label="Other (4) 1.7 TB, 14%" data-dd-chart-label="Other (4)" data-dd-chart-value="1.7 TB · 14%">&#x3C;/circle>
      &#x3C;/svg>
      &#x3C;div class="dd-chart__donut-center" aria-hidden="true">&#x3C;b>12.4 TB&#x3C;/b>&#x3C;span>stored&#x3C;/span>&#x3C;/div>
    &#x3C;/div>
    &#x3C;ul class="dd-chart__legend dd-chart__legend--stack">
      &#x3C;li class="dd-chart__key dd-chart-s1">dawn-and-dusk&#x3C;span class="dd-chart__key-value">5.4 TB&#x3C;/span>&#x3C;span class="dd-chart__key-share">44%&#x3C;/span>&#x3C;/li>
      &#x3C;li class="dd-chart__key dd-chart-s2">dockey-ui&#x3C;span class="dd-chart__key-value">3.1 TB&#x3C;/span>&#x3C;span class="dd-chart__key-share">25%&#x3C;/span>&#x3C;/li>
      &#x3C;li class="dd-chart__key dd-chart-s3">insomnia&#x3C;span class="dd-chart__key-value">2.2 TB&#x3C;/span>&#x3C;span class="dd-chart__key-share">18%&#x3C;/span>&#x3C;/li>
      &#x3C;li class="dd-chart__key dd-chart-other">Other (4)&#x3C;span class="dd-chart__key-value">1.7 TB&#x3C;/span>&#x3C;span class="dd-chart__key-share">14%&#x3C;/span>&#x3C;/li>
    &#x3C;/ul>
  &#x3C;/div>
&#x3C;/figure>
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

```html
&#x3C;figure class="dd-chart" data-dd-chart>
  &#x3C;figcaption class="dd-chart__head">
    &#x3C;div>&#x3C;p class="dd-chart__title">Cache hit ratio · edge-cache&#x3C;/p>&#x3C;p class="dd-chart__sub">ap-south-1 · last 7 days&#x3C;/p>&#x3C;/div>
  &#x3C;/figcaption>
  &#x3C;div class="dd-chart__frame">
    &#x3C;div class="dd-chart__plot is-empty">
      &#x3C;div class="dd-chart__empty">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-chart"/>&#x3C;/svg>&#x3C;b>No data for this range&#x3C;/b>&#x3C;span>edge-cache hasn’t reported metrics from ap-south-1 since Oct 24.&#x3C;/span>&#x3C;button class="dd-btn dd-btn--secondary dd-btn--sm" type="button" data-dd-toast="Range picker opens here" data-dd-toast-description="Pick dates before Oct 24 to see edge-cache’s last ap-south-1 metrics.">&#x3C;svg class="dd-icon" aria-hidden="true">&#x3C;use href="#dd-i-calendar"/>&#x3C;/svg>&#x3C;span>Change range&#x3C;/span>&#x3C;/button>&#x3C;/div>
    &#x3C;/div>
    &#x3C;div class="dd-chart__x" aria-hidden="true">&#x3C;span>Mon&#x3C;/span>&#x3C;span>Tue&#x3C;/span>&#x3C;span>Wed&#x3C;/span>&#x3C;span>Thu&#x3C;/span>&#x3C;span>Fri&#x3C;/span>&#x3C;span>Sat&#x3C;/span>&#x3C;span>Sun&#x3C;/span>&#x3C;/div>
  &#x3C;/div>
&#x3C;/figure>
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
| `.dd-chart[data-dd-chart]` | Opts into the script: roving focus, touch and floating tooltips, table swap. `.is-active` marks the current mark, `.is-table` the swapped figure. |

## Behaviour

Charts work as static HTML: tooltips open on hover and keyboard focus with CSS alone. Add `data-dd-chart` to the `.dd-chart` figure and the script adds the rest:

- One tab stop per plot. Slots, line points (`__hit`), 100% segments (`__seg`) and donut arcs (`__arc`) — or any element with `data-dd-chart-point` — share a roving `tabindex`. ← → (or ↑ ↓) step through them, Home / End jump to the ends, Esc hides the tooltip until the next move.
- Touch. Tapping a mark opens its tooltip; tapping anywhere else closes it. Tooltips flip to the side with room.
- Floating tooltips. Marks without a `.dd-chart__tip` inside get one built from `data-dd-chart-label`, `data-dd-chart-value` and an optional `data-dd-chart-title`, keyed by the mark’s series class. Give each mark `role="img"` and an `aria-label`, and its container `role="group"`.
- Table view. A `<details class="dd-chart__data">` “View as table” needs no script. To swap the plot for its table instead, add a toggle button `data-dd-chart-view aria-pressed="false" aria-controls="ID"` and a `.dd-chart__data.dd-chart__data--swap` container with that ID and `hidden`; the figure gets `.is-table` and fires `dd:change` with `detail.view` = `"table"` or `"chart"`.
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

