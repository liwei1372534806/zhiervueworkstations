<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="http://wiki.goshare2.net" target="_blank">Wiki</a>
      <a href="http://jira.goshare2.net" target="_blank">Jira</a>
      <a href="http://manager-java.goshare2.com/" target="_blank">JAVA后台</a>
      <a href="http://manager-v2.goshare2.com/" target="_blank">PHP后台</a>
    </template>
    <template v-slot:copyright>
      <a href="https://www.antdv.com/docs/vue/introduce-cn/" target="_blank">只二-技术部-测试组</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
