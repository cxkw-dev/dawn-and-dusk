# date picker — `date-picker`

Picks a day or a range. A text input with a calendar popover, a calendar on its own, and a range picker with presets for log and deploy filters.

Live, with every state: https://cxkw-dev.github.io/dawn-and-dusk/components/date-picker

Every snippet is the exact markup of a working docs example. Icons are `<svg class="dd-icon" aria-hidden="true"><use href="#dd-i-NAME"/></svg>` from the sprite.

### Input with calendar

Shown open. Today (Oct 30) carries the apricot dot; the chosen day fills with the accent. Try it: pick a day, or click the calendar button to close and reopen it.

```html
<div class="dd-field" style="max-width: 320px">
  <label class="dd-field__label" for="dp-1">Release date</label>
  <div class="dd-date-picker is-open" data-dd-date-picker>
    <div class="dd-input">
      <input class="dd-input__control" id="dp-1" value="Nov 4, 2026" placeholder="Pick a date" autocomplete="off">
      <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-date-toggle aria-label="Choose date" aria-haspopup="dialog" aria-expanded="true" aria-controls="dp-1-pop"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-calendar"/></svg></button></span>
    </div>
    <div class="dd-date-picker__popover" id="dp-1-pop" role="dialog" aria-label="Choose date">
      <div class="dd-calendar" data-dd-calendar data-month="2026-11" data-today="2026-10-30" data-value="2026-11-04">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">November <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="November 2026">
      <thead><tr><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th><th scope="col" abbr="Sunday">su</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-30" tabindex="-1" aria-pressed="false" aria-current="date">30</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-04" tabindex="0" aria-pressed="true">4</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-08" tabindex="-1" aria-pressed="false">8</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-09" tabindex="-1" aria-pressed="false">9</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-10" tabindex="-1" aria-pressed="false">10</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-11" tabindex="-1" aria-pressed="false">11</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-12" tabindex="-1" aria-pressed="false">12</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-13" tabindex="-1" aria-pressed="false">13</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-14" tabindex="-1" aria-pressed="false">14</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-15" tabindex="-1" aria-pressed="false">15</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-16" tabindex="-1" aria-pressed="false">16</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-17" tabindex="-1" aria-pressed="false">17</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-18" tabindex="-1" aria-pressed="false">18</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-19" tabindex="-1" aria-pressed="false">19</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-20" tabindex="-1" aria-pressed="false">20</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-21" tabindex="-1" aria-pressed="false">21</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-22" tabindex="-1" aria-pressed="false">22</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-23" tabindex="-1" aria-pressed="false">23</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-24" tabindex="-1" aria-pressed="false">24</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-25" tabindex="-1" aria-pressed="false">25</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-29" tabindex="-1" aria-pressed="false">29</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-30" tabindex="-1" aria-pressed="false">30</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-06" tabindex="-1" aria-pressed="false">6</button></td></tr>
      </tbody>
    </table>
  </div>
    </div>
  </div>
</div>
```

## Opening and choosing

The calendar button (or ↓ in the input) opens the popover with focus on the chosen day. Choosing a day fills the input and closes it; Esc, a click outside, tabbing away or the calendar button closes without changes. Typed dates are parsed on change.

Try it: open a calendar with the button or ↓, move with the arrow keys, Enter to choose. Or type a date like 2026-12-01 and press Tab.

```html
<form class="dd-form" onsubmit="return false" style="max-width: 640px">
  <div class="dd-form__grid">
<div class="dd-field" style="max-width: 320px">
  <label class="dd-field__label" for="dp-2">Freeze starts</label>
  <div class="dd-date-picker" data-dd-date-picker>
    <div class="dd-input">
      <input class="dd-input__control" id="dp-2" value="Nov 26, 2026" placeholder="Pick a date" autocomplete="off">
      <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-date-toggle aria-label="Choose date" aria-haspopup="dialog" aria-expanded="false" aria-controls="dp-2-pop"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-calendar"/></svg></button></span>
    </div>
    <div class="dd-date-picker__popover" id="dp-2-pop" role="dialog" aria-label="Choose date" hidden>
      <div class="dd-calendar" data-dd-calendar data-month="2026-11" data-today="2026-10-30" data-value="2026-11-26">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">November <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="November 2026">
      <thead><tr><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th><th scope="col" abbr="Sunday">su</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-30" tabindex="-1" aria-pressed="false" aria-current="date">30</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-08" tabindex="-1" aria-pressed="false">8</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-09" tabindex="-1" aria-pressed="false">9</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-10" tabindex="-1" aria-pressed="false">10</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-11" tabindex="-1" aria-pressed="false">11</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-12" tabindex="-1" aria-pressed="false">12</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-13" tabindex="-1" aria-pressed="false">13</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-14" tabindex="-1" aria-pressed="false">14</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-15" tabindex="-1" aria-pressed="false">15</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-16" tabindex="-1" aria-pressed="false">16</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-17" tabindex="-1" aria-pressed="false">17</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-18" tabindex="-1" aria-pressed="false">18</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-19" tabindex="-1" aria-pressed="false">19</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-20" tabindex="-1" aria-pressed="false">20</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-21" tabindex="-1" aria-pressed="false">21</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-22" tabindex="-1" aria-pressed="false">22</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-23" tabindex="-1" aria-pressed="false">23</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-24" tabindex="-1" aria-pressed="false">24</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-25" tabindex="-1" aria-pressed="false">25</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-26" tabindex="0" aria-pressed="true">26</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-11-29" tabindex="-1" aria-pressed="false">29</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-11-30" tabindex="-1" aria-pressed="false">30</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-12-06" tabindex="-1" aria-pressed="false">6</button></td></tr>
      </tbody>
    </table>
  </div>
    </div>
  </div>
  <p class="dd-field__hint">Click the calendar or press ↓.</p>
</div>
<div class="dd-field" style="max-width: 320px">
  <label class="dd-field__label" for="dp-3">Freeze ends</label>
  <div class="dd-date-picker" data-dd-date-picker>
    <div class="dd-input">
      <input class="dd-input__control" id="dp-3" value="" placeholder="Pick a date" autocomplete="off">
      <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-date-toggle aria-label="Choose date" aria-haspopup="dialog" aria-expanded="false" aria-controls="dp-3-pop"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-calendar"/></svg></button></span>
    </div>
    <div class="dd-date-picker__popover" id="dp-3-pop" role="dialog" aria-label="Choose date" hidden>
      <div class="dd-calendar" data-dd-calendar data-month="2026-10" data-today="2026-10-30">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">October <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="October 2026">
      <thead><tr><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th><th scope="col" abbr="Sunday">su</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-30" tabindex="-1" aria-pressed="false">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-04" tabindex="-1" aria-pressed="false">4</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-08" tabindex="-1" aria-pressed="false">8</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-09" tabindex="-1" aria-pressed="false">9</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-10" tabindex="-1" aria-pressed="false">10</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-11" tabindex="-1" aria-pressed="false">11</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-12" tabindex="-1" aria-pressed="false">12</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-13" tabindex="-1" aria-pressed="false">13</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-14" tabindex="-1" aria-pressed="false">14</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-15" tabindex="-1" aria-pressed="false">15</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-16" tabindex="-1" aria-pressed="false">16</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-17" tabindex="-1" aria-pressed="false">17</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-18" tabindex="-1" aria-pressed="false">18</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-19" tabindex="-1" aria-pressed="false">19</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-20" tabindex="-1" aria-pressed="false">20</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-21" tabindex="-1" aria-pressed="false">21</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-22" tabindex="-1" aria-pressed="false">22</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-23" tabindex="-1" aria-pressed="false">23</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-24" tabindex="-1" aria-pressed="false">24</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-25" tabindex="-1" aria-pressed="false">25</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-30" tabindex="0" aria-pressed="false" aria-current="date">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td></tr>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-08" tabindex="-1" aria-pressed="false">8</button></td></tr>
      </tbody>
    </table>
  </div>
    </div>
  </div>
</div>
    <div class="dd-field dd-form__span">
      <label class="dd-field__label" for="dp-4">Reason</label>
      <div class="dd-input dd-textarea"><textarea class="dd-input__control" id="dp-4" rows="3">Holiday traffic. No deploys to billing-worker or edge-cache.</textarea></div>
    </div>
    <label class="dd-checkbox dd-form__span"><input class="dd-checkbox__input" type="checkbox" checked><span class="dd-checkbox__text"><span class="dd-checkbox__label">Post to #deploys</span><span class="dd-checkbox__desc">When the freeze starts and when it lifts.</span></span></label>
  </div>
  <div class="dd-form__footer">
    <button class="dd-btn dd-btn--ghost" type="button">Cancel</button>
    <button class="dd-btn dd-btn--primary" type="submit" data-dd-toast="Freeze scheduled" data-dd-toast-description="No deploys to billing-worker or edge-cache until it lifts." data-dd-toast-intent="ok"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-lock"/></svg><span>Schedule freeze</span></button>
  </div>
</form>
```

## Inline calendar

The calendar works on its own; `.dd-calendar--panel` gives it a tonal panel. The second one starts weeks on Sunday (`data-week-start="0"`) and limits choices with `data-min` / `data-max`.

Try it: click a day, or Tab into the grid and use ← → ↑ ↓, Page Up / Down. The second calendar stops at its limits.

```html
<div class="dd-row" style="align-items: flex-start; --dd-gap: 20px">
  <div class="dd-calendar dd-calendar--panel" data-dd-calendar data-month="2026-10" data-today="2026-10-30" data-value="2026-10-14">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">October <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="October 2026">
      <thead><tr><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th><th scope="col" abbr="Sunday">su</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-30" tabindex="-1" aria-pressed="false">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-04" tabindex="-1" aria-pressed="false">4</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-08" tabindex="-1" aria-pressed="false">8</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-09" tabindex="-1" aria-pressed="false">9</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-10" tabindex="-1" aria-pressed="false">10</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-11" tabindex="-1" aria-pressed="false">11</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-12" tabindex="-1" aria-pressed="false">12</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-13" tabindex="-1" aria-pressed="false">13</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-14" tabindex="0" aria-pressed="true">14</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-15" tabindex="-1" aria-pressed="false">15</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-16" tabindex="-1" aria-pressed="false">16</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-17" tabindex="-1" aria-pressed="false">17</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-18" tabindex="-1" aria-pressed="false">18</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-19" tabindex="-1" aria-pressed="false">19</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-20" tabindex="-1" aria-pressed="false">20</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-21" tabindex="-1" aria-pressed="false">21</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-22" tabindex="-1" aria-pressed="false">22</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-23" tabindex="-1" aria-pressed="false">23</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-24" tabindex="-1" aria-pressed="false">24</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-25" tabindex="-1" aria-pressed="false">25</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-30" tabindex="-1" aria-pressed="false" aria-current="date">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td></tr>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-08" tabindex="-1" aria-pressed="false">8</button></td></tr>
      </tbody>
    </table>
  </div>
  <div class="dd-calendar dd-calendar--panel" data-dd-calendar data-month="2026-10" data-today="2026-10-30" data-week-start="0" data-value="2026-10-21" data-min="2026-10-19" data-max="2026-11-13">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">October <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="October 2026">
      <thead><tr><th scope="col" abbr="Sunday">su</th><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-27" tabindex="-1" aria-pressed="false" disabled>27</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-28" tabindex="-1" aria-pressed="false" disabled>28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-29" tabindex="-1" aria-pressed="false" disabled>29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-30" tabindex="-1" aria-pressed="false" disabled>30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-01" tabindex="-1" aria-pressed="false" disabled>1</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-02" tabindex="-1" aria-pressed="false" disabled>2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-03" tabindex="-1" aria-pressed="false" disabled>3</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-04" tabindex="-1" aria-pressed="false" disabled>4</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-05" tabindex="-1" aria-pressed="false" disabled>5</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-06" tabindex="-1" aria-pressed="false" disabled>6</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-07" tabindex="-1" aria-pressed="false" disabled>7</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-08" tabindex="-1" aria-pressed="false" disabled>8</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-09" tabindex="-1" aria-pressed="false" disabled>9</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-10" tabindex="-1" aria-pressed="false" disabled>10</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-11" tabindex="-1" aria-pressed="false" disabled>11</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-12" tabindex="-1" aria-pressed="false" disabled>12</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-13" tabindex="-1" aria-pressed="false" disabled>13</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-14" tabindex="-1" aria-pressed="false" disabled>14</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-15" tabindex="-1" aria-pressed="false" disabled>15</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-16" tabindex="-1" aria-pressed="false" disabled>16</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-17" tabindex="-1" aria-pressed="false" disabled>17</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-18" tabindex="-1" aria-pressed="false" disabled>18</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-19" tabindex="-1" aria-pressed="false">19</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-20" tabindex="-1" aria-pressed="false">20</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-21" tabindex="0" aria-pressed="true">21</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-22" tabindex="-1" aria-pressed="false">22</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-23" tabindex="-1" aria-pressed="false">23</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-24" tabindex="-1" aria-pressed="false">24</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-25" tabindex="-1" aria-pressed="false">25</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-30" tabindex="-1" aria-pressed="false" aria-current="date">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td></tr>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td></tr>
      </tbody>
    </table>
  </div>
</div>
```

## Range

`data-mode="range"`: the first click sets the start, the second the end (in either order), and a lighter band previews the range while you hover. The ends fill with the accent; the days between sit on a soft accent band.

Try it: click a start day, hover to see the band, click an end day.

```html
<div class="dd-calendar dd-calendar--panel" data-dd-calendar data-month="2026-10" data-today="2026-10-30" data-mode="range" data-start="2026-10-05" data-end="2026-10-18">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">October <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="October 2026">
      <thead><tr><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th><th scope="col" abbr="Sunday">su</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-30" tabindex="-1" aria-pressed="false">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-04" tabindex="-1" aria-pressed="false">4</button></td></tr>
      <tr><td class="is-range-start"><button class="dd-calendar__day" type="button" data-date="2026-10-05" tabindex="0" aria-pressed="true">5</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-06" tabindex="-1" aria-pressed="false">6</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-07" tabindex="-1" aria-pressed="false">7</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-08" tabindex="-1" aria-pressed="false">8</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-09" tabindex="-1" aria-pressed="false">9</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-10" tabindex="-1" aria-pressed="false">10</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-11" tabindex="-1" aria-pressed="false">11</button></td></tr>
      <tr><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-12" tabindex="-1" aria-pressed="false">12</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-13" tabindex="-1" aria-pressed="false">13</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-14" tabindex="-1" aria-pressed="false">14</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-15" tabindex="-1" aria-pressed="false">15</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-16" tabindex="-1" aria-pressed="false">16</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-17" tabindex="-1" aria-pressed="false">17</button></td><td class="is-range-end"><button class="dd-calendar__day" type="button" data-date="2026-10-18" tabindex="-1" aria-pressed="true">18</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-19" tabindex="-1" aria-pressed="false">19</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-20" tabindex="-1" aria-pressed="false">20</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-21" tabindex="-1" aria-pressed="false">21</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-22" tabindex="-1" aria-pressed="false">22</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-23" tabindex="-1" aria-pressed="false">23</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-24" tabindex="-1" aria-pressed="false">24</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-25" tabindex="-1" aria-pressed="false">25</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-30" tabindex="-1" aria-pressed="false" aria-current="date">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td></tr>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-08" tabindex="-1" aria-pressed="false">8</button></td></tr>
      </tbody>
    </table>
  </div>
```

Presets set common windows in one click — give them `data-start` / `data-end`, or `data-days="7"` to count back from today. With an Apply button the input only changes when you apply.

Try it: pick a preset or two days, then Apply; Cancel, Esc or a click outside puts the old range back.

```html
<div class="dd-field" style="max-width: 340px">
  <label class="dd-field__label" for="dp-r">Deploys between</label>
  <div class="dd-date-picker is-open" data-dd-date-picker>
    <div class="dd-input">
      <span class="dd-input__affix"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-calendar"/></svg></span>
      <input class="dd-input__control" id="dp-r" value="Oct 17 – Oct 30, 2026" readonly>
      <span class="dd-input__affix"><button class="dd-input__btn" type="button" data-dd-date-toggle aria-label="Choose dates" aria-haspopup="dialog" aria-expanded="true" aria-controls="dp-r-pop"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-down"/></svg></button></span>
    </div>
    <div class="dd-date-picker__popover" id="dp-r-pop" role="dialog" aria-label="Choose dates">
      <div class="dd-date-picker__presets" role="group" aria-label="Presets">
        <button class="dd-date-picker__preset" type="button" data-start="2026-10-30" data-end="2026-10-30" aria-pressed="false">Today</button>
        <button class="dd-date-picker__preset" type="button" data-start="2026-10-24" data-end="2026-10-30" aria-pressed="false">Last 7 days</button>
        <button class="dd-date-picker__preset" type="button" data-start="2026-10-17" data-end="2026-10-30" aria-pressed="true">Last 14 days</button>
        <button class="dd-date-picker__preset" type="button" data-start="2026-10-01" data-end="2026-10-30" aria-pressed="false">Last 30 days</button>
        <button class="dd-date-picker__preset" type="button" data-start="2026-10-01" data-end="2026-10-31" aria-pressed="false">This month</button>
        <button class="dd-date-picker__preset" type="button" data-start="2026-07-01" data-end="2026-09-30" aria-pressed="false">Last quarter</button>
      </div>
      <div class="dd-date-picker__main">
        <div class="dd-calendar" data-dd-calendar data-month="2026-10" data-today="2026-10-30" data-mode="range" data-start="2026-10-17" data-end="2026-10-30">
    <div class="dd-calendar__head">
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="-1" aria-label="Previous month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-left"/></svg></button>
      <p class="dd-calendar__title" aria-live="polite">October <span>2026</span></p>
      <button class="dd-calendar__nav" type="button" data-dd-cal-nav="1" aria-label="Next month"><svg class="dd-icon" aria-hidden="true"><use href="#dd-i-chevron-right"/></svg></button>
    </div>
    <table class="dd-calendar__grid" aria-label="October 2026">
      <thead><tr><th scope="col" abbr="Monday">mo</th><th scope="col" abbr="Tuesday">tu</th><th scope="col" abbr="Wednesday">we</th><th scope="col" abbr="Thursday">th</th><th scope="col" abbr="Friday">fr</th><th scope="col" abbr="Saturday">sa</th><th scope="col" abbr="Sunday">su</th></tr></thead>
      <tbody>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-28" tabindex="-1" aria-pressed="false">28</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-29" tabindex="-1" aria-pressed="false">29</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-09-30" tabindex="-1" aria-pressed="false">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-01" tabindex="-1" aria-pressed="false">1</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-04" tabindex="-1" aria-pressed="false">4</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-08" tabindex="-1" aria-pressed="false">8</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-09" tabindex="-1" aria-pressed="false">9</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-10" tabindex="-1" aria-pressed="false">10</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-11" tabindex="-1" aria-pressed="false">11</button></td></tr>
      <tr><td><button class="dd-calendar__day" type="button" data-date="2026-10-12" tabindex="-1" aria-pressed="false">12</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-13" tabindex="-1" aria-pressed="false">13</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-14" tabindex="-1" aria-pressed="false">14</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-15" tabindex="-1" aria-pressed="false">15</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-16" tabindex="-1" aria-pressed="false">16</button></td><td class="is-range-start"><button class="dd-calendar__day" type="button" data-date="2026-10-17" tabindex="0" aria-pressed="true">17</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-18" tabindex="-1" aria-pressed="false">18</button></td></tr>
      <tr><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-19" tabindex="-1" aria-pressed="false">19</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-20" tabindex="-1" aria-pressed="false">20</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-21" tabindex="-1" aria-pressed="false">21</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-22" tabindex="-1" aria-pressed="false">22</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-23" tabindex="-1" aria-pressed="false">23</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-24" tabindex="-1" aria-pressed="false">24</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-25" tabindex="-1" aria-pressed="false">25</button></td></tr>
      <tr><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-26" tabindex="-1" aria-pressed="false">26</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-27" tabindex="-1" aria-pressed="false">27</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-28" tabindex="-1" aria-pressed="false">28</button></td><td class="is-in-range"><button class="dd-calendar__day" type="button" data-date="2026-10-29" tabindex="-1" aria-pressed="false">29</button></td><td class="is-range-end"><button class="dd-calendar__day" type="button" data-date="2026-10-30" tabindex="-1" aria-pressed="true" aria-current="date">30</button></td><td><button class="dd-calendar__day" type="button" data-date="2026-10-31" tabindex="-1" aria-pressed="false">31</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-01" tabindex="-1" aria-pressed="false">1</button></td></tr>
      <tr><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-02" tabindex="-1" aria-pressed="false">2</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-03" tabindex="-1" aria-pressed="false">3</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-04" tabindex="-1" aria-pressed="false">4</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-05" tabindex="-1" aria-pressed="false">5</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-06" tabindex="-1" aria-pressed="false">6</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-07" tabindex="-1" aria-pressed="false">7</button></td><td><button class="dd-calendar__day is-outside" type="button" data-date="2026-11-08" tabindex="-1" aria-pressed="false">8</button></td></tr>
      </tbody>
    </table>
  </div>
        <div class="dd-date-picker__foot">
          <span class="dd-date-picker__summary">Oct 17 – Oct 30, 2026 · 14 days</span>
          <button class="dd-btn dd-btn--ghost dd-btn--sm" type="button" data-dd-date-cancel>Cancel</button>
          <button class="dd-btn dd-btn--primary dd-btn--sm" type="button" data-dd-date-apply>Apply</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Classes

| class / attribute | what it does |
|---|---|
| `.dd-date-picker` | Wrapper: a `.dd-input` and its popover. `.is-open` while open. |
| `.dd-date-picker__popover` | Floating panel (`role="dialog"`). `--end` aligns right, `--static` renders in flow. |
| `.dd-date-picker__presets · __preset` | Preset column (a row on narrow screens); the active preset has `aria-pressed="true"`. |
| `.dd-date-picker__main · __foot · __summary` | Calendar column, footer with actions, and a mono summary of the range. |
| `.dd-calendar` | One month. `--panel` adds a tonal panel for inline use. |
| `.dd-calendar__head · __title · __nav` | Month title and previous / next buttons (`data-dd-cal-nav="-1\|1"`). |
| `.dd-calendar__grid` | The month `<table>`; weekday headers in mono. |
| `.dd-calendar__day` | A day button. `aria-pressed` (chosen, accent fill), `aria-current="date"` (today, apricot dot), `.is-outside` (quiet), `disabled` (quiet, struck through). |
| `td.is-range-start · is-in-range · is-range-end` | Range band on the cells; `.is-preview` while hovering for an end. |

## Behaviour

`ds/behaviors/date-picker.js` renders the months and handles selection, the keyboard and the popover.

| class / attribute | what it does |
|---|---|
| `data-dd-calendar` | Renders the month from `data-month`, `data-value` or `data-start` / `data-end`, `data-mode`, `data-today`, `data-min`, `data-max`, `data-week-start` (1 = Monday, the default; 0 = Sunday). Fires a bubbling `dd:date` event (and the legacy `dd-date` event) with `{ value }`, or `{ start, end }` for a range. |
| `data-dd-date-picker` | On the wrapper: popover, filling the input, optional hidden input (ISO, ranges as `start/end`). A read-only input opens the popover on click. |
| `data-dd-date-toggle` | Button that opens / closes the popover. |
| `data-dd-date-apply · data-dd-date-cancel` | Range footer buttons: commit, or close and restore. Without an Apply button, the second day or a preset commits and closes. |
| `← → ↑ ↓` | Move a day or a week; crossing a month edge turns the page. Focus stops at `data-min` / `data-max`. |
| `Page Up · Page Down · Home · End` | Same day in the previous / next month; start / end of the week. |
| `Enter · Space` | Choose the focused day. |
| `Esc · Tab out · click outside` | Close the popover without changes; Esc returns focus to the calendar button. |
| `Typing a date` | Single mode: parsed on change (`2026-12-01`, `Dec 1, 2026`, `Dec 1`). Numeric dates are read as local days, a date without a year takes today’s, and a day the month doesn’t have (`Feb 31`) is invalid. A date outside `data-min` / `data-max`, or text that isn’t a date, sets `aria-invalid`; clearing the field clears the value. |

## Guidelines

Do:
- Let people type a date as well as pick one.
- Offer presets for log and metric ranges — most people want “last 7 days”.
- Show the range length in the summary, so off-by-one mistakes are visible.

Don't:
- Don’t use a calendar for birthdays or dates far in the past — three inputs are faster.
- Don’t hide today; it is the anchor for every relative choice.
- Don’t apply a range on the first click.

