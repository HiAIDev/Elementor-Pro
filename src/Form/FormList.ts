import { defineComponent, h } from 'vue'
import { isArray, isUndefined } from '../utils/index'
import { formEmits, formProps } from './props'
import ProArrayForm from './ArrayForm'
import ProFormItem from './FormItem'
import type { UnknownObject } from '../types/index'

export default defineComponent({
  name: 'ProFormList',
  props: formProps,
  emits: formEmits,
  setup(props, { emit }) {
    function update(value: unknown) {
      emit('update:modelValue', value)
    }

    function createColumn() {
      return props.columns?.map((item) => {
        const prefix = `${props.prefix}${props.prefix ? '.' : ''}${item.prop}`

        return h(ProFormItem, {
          modelValue: props.modelValue,
          item,
          indexes: props.indexes,
          prefix,
          'onUpdate:modelValue': update,
        })
      })
    }

    return () => {
      if (props.type === 'array') {
        if (!isArray(props.modelValue) && !isUndefined(props.modelValue)) {
          update(undefined)
        }
        return h(ProArrayForm, {
          modelValue: props.modelValue as UnknownObject[] | undefined,
          columns: props.columns,
          prefix: props.prefix,
          indexes: props.indexes,
          max: props.max,
          'onUpdate:modelValue': update,
        })
      } else {
        return createColumn()
      }
    }
  },
})
