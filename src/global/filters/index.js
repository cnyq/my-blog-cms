import Vue from 'vue'
import { formatTime } from '@/utils/index'

Vue.filter('filterFormatTime', function (time, format) {
    return formatTime(time, format)
})