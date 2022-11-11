import { createAppComponent } from './app'
import { initStore, saveInStorage } from './services/dataApi'

initStore()

const appComponent = createAppComponent()
root.append(appComponent)

window.addEventListener('beforeunload', () => saveInStorage())
