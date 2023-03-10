<template>
  <div class="app-header-wrapper">
    <AppLogo />

    <div class="search-wrapper">
      <div class="fields-wrapper">
        <InputField
          placeholder="Search stock by its symbol e.g. AAPL"
          :disabled="isFetching"
          :error="error"
          @on-change="setEnteredSymbol"
        />
        <SelectInput
          :options="selectOptions"
          :disabled="isFetching"
          @on-change="setSelectedExchange"
        />
      </div>

      <TheButton
        :disabled="isFetching || !hasEnteredSymbol"
        @click="handleClick"
      >
        <QIcon name="bi-search" />
      </TheButton>
    </div>

    <ToggleInput
      size="lg"
      unchecked-icon="bi-sun-fill"
      checked-icon="bi-moon-fill"
      :value="isDarkModeToggled"
      @on-change="handleToggleTheme"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppLogo from '@/components/molecules/AppLogo.vue';
import InputField from '@/components/molecules/InputField.vue';
import SelectInput from '@/components/molecules/SelectInput.vue';
import TheButton from '@/components/molecules/TheButton.vue';
import ToggleInput from '@/components/molecules/ToggleInput.vue';
import config from '@/config';
import type { SelectOption } from '@/types';

export default defineComponent({
  name: 'AppHeader',
  components: {
    AppLogo,
    InputField,
    SelectInput,
    TheButton,
    ToggleInput
  },
  emits: ['on-search'],
  data() {
    return {
      isDarkModeToggled: false,
      stockPayload: {
        symbol: '',
        exchange: '',
        modules: config.yahooFinanceApiModules
      },
      selectOptions: [
        { label: 'USA - National Market System (NMS)', value: '' },
        { label: 'BR - Brasil, Bolsa, Balcão (B3)', value: '.SA' }
      ] as SelectOption[]
    };
  },
  computed: {
    theme() {
      return this.$store.getters['theme/currentTheme'];
    },
    isFetching() {
      return this.$store.getters['stock/isFetching'];
    },
    hasEnteredSymbol() {
      return !!this.stockPayload.symbol.length;
    },
    error() {
      return this.$store.getters['stock/error'];
    }
  },
  created() {
    this.isDarkModeToggled = this.theme === 'dark';
  },
  methods: {
    setEnteredSymbol(value: string) {
      this.stockPayload.symbol = value.toUpperCase();
    },
    setSelectedExchange(value: string) {
      this.stockPayload.exchange = value;
    },
    handleClick() {
      this.$emit('on-search', this.stockPayload);
    },
    handleToggleTheme() {
      this.isDarkModeToggled = !this.isDarkModeToggled;
      const isDarkTheme = this.theme === 'dark';

      this.$store.commit(
        'theme/setCurrentTheme',
        isDarkTheme ? 'light' : 'dark'
      );
    }
  }
});
</script>

<style scoped>
.app-header-wrapper {
  width: 100%;
  height: 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-wrapper {
  width: 50%;

  display: flex;
  align-items: center;
}

.fields-wrapper {
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 1rem;
}

@media (max-width: 650px) {
  .search-wrapper {
    width: 82.5%;

    margin-left: 1rem;
  }
}
@media (max-width: 545px) {
  .search-wrapper {
    width: 78.5%;
  }
}
</style>
