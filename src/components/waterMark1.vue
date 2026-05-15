<template>

      <svg class="waterMark waterSet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
            <text text-anchor="middle" font-weight="bold" font-size="7" x="50" y="6" fill="#FFFFFF" opacity="0.15">
                PRIMARY HAND
                </text>
        </svg>  
</template>


<script>
export default {
  name: "waterMark"
};
</script>

<style>
.waterSet {
  position: absolute;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE - portrait layout*/
  .waterSet {
    width: 50%;
    left: 25%;
  }
  .waterMark {
    top: 65%;
  }
  .waterMark2 {
    top: 45%;
  }
  .waterMark3 {
    top: 3%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .waterSet {
    width: 50%;
    left: 25%;
  }
  .waterMark {
    top: 65%;
  }
  .waterMark2 {
    top: 45%;
  }
  .waterMark3 {
    top: 3%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE MODE - portrait layout*/
  .waterSet {
    width: 50%;
    left: 25%;
  }
  .waterMark {
    top: 65%;
  }
  .waterMark2 {
    top: 45%;
  }
  .waterMark3 {
    top: 3%;
  }
}
</style>