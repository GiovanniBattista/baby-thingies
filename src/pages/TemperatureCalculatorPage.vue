<template>
  <f7-page name="calculator">
    <f7-navbar title="Temperaturrechner"></f7-navbar>
      <form class="form-group needs-validation" @submit.prevent="calculateAmounts" novalidate>
        <f7-list accordion-list>
          <ul>
            <temperature-calculator-target-values 
              v-model:amount="targetAmount" 
              v-model:temperature="targetTemperature">
            </temperature-calculator-target-values>

            <temperature-calculator-current-temperatures 
              v-model:hot="currentHotWaterTemperature"
              v-model:cold="currentColdWaterTemperature">
            </temperature-calculator-current-temperatures>
          </ul>
        </f7-list>

        <f7-block>
          <f7-button 
            type="submit"
            outline
            large
            fill>
            Berechnen
          </f7-button>
        </f7-block>

      </form>

      <div v-if="!formValid" class="alert alert-danger" role="alert">
        Bitte zuerst alles korrekt ausfüllen!
      </div>

      <temperature-calculator-calculated-amounts
        :hot="calculatedHotWaterAmount"
        :cold="calculatedColdWaterAmount">
      </temperature-calculator-calculated-amounts>
  </f7-page>
</template>

<script>
import TemperatureCalculatorCurrentTemperatures from '../components/TemperatureCalculatorCurrentTemperatures.vue';
import TemperatureCalculatorTargetValues from '../components/TemperatureCalculatorTargetValues.vue';
import TemperatureCalculatorCalculatedAmounts from '../components/TemperatureCalculatorCalculatedAmounts.vue';
import gauss from 'gaussian-elimination';
import { useVuelidate } from '@vuelidate/core'

export default {

  components: {
    TemperatureCalculatorTargetValues,
    TemperatureCalculatorCurrentTemperatures,
    TemperatureCalculatorCalculatedAmounts,
  },

  setup() {
    const v = useVuelidate()
    // this will collect all nested component’s validation results
    return { v }
  },

  data() {
    //const storedData = ls.get('water-temp-calculator-data')
    const storedData = JSON.parse(localStorage.getItem('water-temp-calculator-data'))
    console.log(storedData)

    return {
      targetAmount: Number(storedData?.targetAmount) || 60,
      targetTemperature: Number(storedData?.targetTemperature) || 40,

      currentHotWaterTemperature: Number(storedData?.currentHotWaterTemperature) || 80,
      currentColdWaterTemperature: Number(storedData?.currentColdWaterTemperature) || 20,

      calculatedHotWaterAmount: 0,
      calculatedColdWaterAmount: 0,

      formValid: true,
    }
  },
  data() {
    //const storedData = ls.get('water-temp-calculator-data')
    const storedData = JSON.parse(localStorage.getItem('water-temp-calculator-data'))
    console.log(storedData)

    return {
      targetAmount: Number(storedData?.targetAmount) || 60,
      targetTemperature: Number(storedData?.targetTemperature) || 40,

      currentHotWaterTemperature: Number(storedData?.currentHotWaterTemperature) || 80,
      currentColdWaterTemperature: Number(storedData?.currentColdWaterTemperature) || 20,

      calculatedHotWaterAmount: 0,
      calculatedColdWaterAmount: 0,

      formValid: true,
    }
  },

  methods: {
    async calculateAmounts() {
      this.formValid = await this.v.$validate()
      
      if (!this.formValid) {
        console.log("Form is not yet valid!")
        return
      }

      //const dataArray2Store = JSON.parse(JSON.stringify(this.$data))
      console.log("Store currently set values...", this.$data)
      localStorage.setItem('water-temp-calculator-data', JSON.stringify(this.$data))

      const arr = [ [this.currentColdWaterTemperature, this.currentHotWaterTemperature, this.targetAmount * this.targetTemperature],
                  [1, 1, this.targetAmount]]
                  
      console.log("Calculating amounts...")
      const result = gauss(arr)

      this.calculatedColdWaterAmount = Math.ceil(result[0])
      this.calculatedHotWaterAmount = Math.ceil(result[1])
    }
  },
};
</script>

<style lang="scss" scoped></style>