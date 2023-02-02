<template>
  <div class="w-full p-4 my-4">
    <h2
      class="mt-2 text-2xl font-bold text-center uppercase dark:text-slate-300"
    >
      {{ title }}
    </h2>
    <h2 class="mt-2 text-xs font-semibold text-center dark:text-slate-300">
      {{ criterial }}
    </h2>
    <div class="flex">
      <div class="flex-initial w-1/2 mx-8">
        <div
          class="text-bold text-xl text-center font-semibold uppercase pb-1 dark:text-slate-300"
        >
          Highest
        </div>
        <div
          class="bg-green-500 text-white rounded-md shadow-xl shadow-slate-400 dark:shadow-slate-700 hover:shadow-slate-600 dark:hover:shadow-slate-900 hover:shadow-2xl p-2 duration-300"
        >
          <div class="pb-2">
            <span class="font-semibold">lots available: </span>{{ highestLots }}
          </div>
          <div>Carpark Number with stated number of lot(s) available:</div>
          <div v-if="highestCPNumber.length">
            <div class="flex flex-wrap gap-1">
              <div
                class="flex-col w-12 text-slate-300 hover:text-white hover:ease-in duration-300"
                v-for="item in highestCPNumber"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div v-else>no data</div>
        </div>
      </div>
      <div class="flex-initial w-1/2 mx-8">
        <div
          class="text-bold text-xl text-center font-semibold uppercase pb-1 dark:text-slate-300"
        >
          Lowest
        </div>
        <div
          class="bg-red-500 text-white rounded-md shadow-xl shadow-slate-400 dark:shadow-slate-700 hover:shadow-slate-600 dark:hover:shadow-slate-900 hover:shadow-2xl p-2 duration-500"
        >
          <div class="pb-2">
            <span class="font-semibold">lots available: </span>{{ lowestLots }}
          </div>
          <div>Carpark Number with stated number of lot(s) available:</div>
          <div v-if="lowestCPNumber.length">
            <div class="flex flex-wrap gap-1">
              <div
                class="flex-col w-12 text-slate-300 hover:text-white hover:ease-in duration-300"
                v-for="item in lowestCPNumber"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div v-else>no data</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "criterial",
    "highestLots",
    "highestCPNumber",
    "lowestLots",
    "lowestCPNumber",
  ],
};
</script>
