<!-- Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. -->
<template>
  <Graph :option="option" @select="clickEvent" :filters="config.filters" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import type { PropType } from "vue";
import {
  BarConfig,
  EventParams,
  RelatedTrace,
  Filters,
} from "@/types/dashboard";

/*global defineProps, defineEmits */
const emits = defineEmits(["click"]);
const props = defineProps({
  data: {
    type: Object as PropType<{ [key: string]: number[] }>,
    default: () => ({}),
  },
  intervalTime: { type: Array as PropType<string[]>, default: () => [] },
  theme: { type: String, default: "light" },
  config: {
    type: Object as PropType<
      BarConfig & {
        filters: Filters;
        relatedTrace: RelatedTrace;
      } & { id: string }
    >,
    default: () => ({}),
  },
});
const option = computed(() => getOption());

function getOption() {
  const keys = Object.keys(props.data || {}).filter(
    (i: any) => Array.isArray(props.data[i]) && props.data[i].length
  );
  const temp = keys.map((i: string) => {
    if (!props.intervalTime) {
      return;
    }
    return {
      data: props.data[i].map((item: number, itemIndex: number) => [
        props.intervalTime[itemIndex],
        item,
      ]),
      name: i,
      type: "bar",
      symbol: "none",
      stack: "sum",
      lineStyle: {
        width: 1.5,
        type: "dotted",
      },
      showBackground: props.config.showBackground,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.1)",
      },
    };
  });
  let color: string[] = [];
  switch (keys.length) {
    case 2:
      color = ["#FF6A84", "#a0b1e6"];
      break;
    case 1:
      color = ["#3f96e3"];
      break;
    default:
      color = [
        "#30A4EB",
        "#45BFC0",
        "#FFCC55",
        "#FF6A84",
        "#a0a7e6",
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3",
      ];
      break;
  }
  return {
    color,
    tooltip: {
      trigger: "none",
      axisPointer: {
        type: "cross",
        color: "#333",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
    },
    legend: {
      type: "scroll",
      show: keys.length === 1 ? false : true,
      icon: "circle",
      top: 0,
      left: 0,
      itemWidth: 12,
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      top: keys.length === 1 ? 15 : 40,
      left: 0,
      right: 10,
      bottom: 5,
      containLabel: true,
    },
    axisPointer: {
      label: {
        color: "#333",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
    },
    xAxis: {
      type: "category",
      axisTick: {
        lineStyle: { color: "#c1c5ca41" },
        alignWithLabel: true,
      },
      splitLine: { show: false },
      axisLine: { lineStyle: { color: "rgba(0,0,0,0)" } },
      axisLabel: { color: "#9da5b2", fontSize: "11" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#c1c5ca41", type: "dashed" } },
      axisLabel: { color: "#9da5b2", fontSize: "11" },
    },
    series: temp,
  };
}
function clickEvent(params: EventParams) {
  emits("click", params);
}
</script>
