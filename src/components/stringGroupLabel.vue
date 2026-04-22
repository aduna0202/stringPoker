<template>
  <div :class="cssClass" v-if="bonus.bonus || winText !== ''">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 19" style="width:100%;">
      <g v-if="bonus.bonus" transform="translate(47, 0) scale(0.67, 0.67)">
        <rect :fill="bonus.fill" style="stroke:#bababa; stroke-miterlimit:10;" x="30" y="1" rx="2" width="105" height="10" />
        <text v-if="bonus.bonus > 1" class="payTableText" text-anchor="middle" font-weight="bold" font-size="7" x="70" y="8.5" fill="#ffffff">{{ bonus.label }}</text>
        <text v-if="bonus.bonus > 1" class="labelCash payTableText" text-anchor="middle" font-weight="bold" font-size="7" x="120" y="8.5" fill="#02F53A">×{{ bonus.bonus + (bonus.counter || 0) }}{{ bonus.plusOne }}</text>
        <text v-if="bonus.bonus === 1" class="payTableText" text-anchor="middle" font-weight="bold" font-size="7" x="82.5" y="8.5" fill="#ffffff">{{ bonus.label }}</text>
      </g>
      <g v-if="winText !== ''" transform="translate(0, -3)">
        <rect style="fill:#5b5b5b; opacity: 0.5;" x="0.5" y="11.5" rx="2.5" width="139" height="10" />
        <rect style="fill:#FFE401; opacity: 0.5;" x="1" y="12" rx="2" width="138" height="9" />
        <text text-anchor="middle" class="stringWinText" font-weight="bold" font-size="5" x="70" y="19" fill="#fc142b">Wins {{ winText }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'string-group-label',
  props: {
    bonus: { type: Object, default: () => ({}) },
    winText: { type: String, default: '' },
    cssClass: { type: String, required: true }
  }
}
</script>
