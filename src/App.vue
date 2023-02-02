<script>
import CardComponent from "./components/CardComponent.vue";
import { sortCP } from "./utils/sortHighLow.js";

export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      data: null,
    };
  },
  created() {
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 60000);
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          "https://api.data.gov.sg/v1/transport/carpark-availability"
        );
        this.data = sortCP(await response.json());
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <main class="dark:bg-slate-600">
    <div
      class="md:container flex flex-col min-h-screen justify-center items-center content-center"
    >
      <h1 class="text-2xl font-bold dark:text-slate-300">
        Carpark lots availability based on size of carparks around Singapore
      </h1>
      <CardComponent
        title="Large"
        criterial="more than 400 lots"
        :highestLots="data.large.highest.lot_available"
        :highestCPNumber="data.large.highest.cp_number"
        :lowestLots="data.large.lowest.lot_available"
        :lowestCPNumber="data.large.lowest.cp_number"
      />
      <CardComponent
        title="Big"
        criterial="more than 300 lots but less than 400 lots"
        :highestLots="data.big.highest.lot_available"
        :highestCPNumber="data.big.highest.cp_number"
        :lowestLots="data.big.lowest.lot_available"
        :lowestCPNumber="data.big.lowest.cp_number"
      />
      <CardComponent
        title="Medium"
        criterial="more than 100 lots but less than 300 lots"
        :highestLots="data.medium.highest.lot_available"
        :highestCPNumber="data.medium.highest.cp_number"
        :lowestLots="data.medium.lowest.lot_available"
        :lowestCPNumber="data.medium.lowest.cp_number"
      />
      <CardComponent
        title="Small"
        criterial="less than 100 lots"
        :highestLots="data.small.highest.lot_available"
        :highestCPNumber="data.small.highest.cp_number"
        :lowestLots="data.small.lowest.lot_available"
        :lowestCPNumber="data.small.lowest.cp_number"
      />
      <div class="font-xs text-slate-400">
        data refreshed at {{ data.refreshDate.toLocaleTimeString() }}
      </div>
    </div>
  </main>
</template>
