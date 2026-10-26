import { diaLiturgico } from '~/utils/liturgia'

export default defineNuxtPlugin(() => {
  const liturgia = useLiturgia()
  onNuxtReady(() => {
    liturgia.value = diaLiturgico()
  })
})
