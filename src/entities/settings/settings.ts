import { createStore } from "effector";

/*  в идее сделать галочку на то, что приложение может
    работать в offline режиме и хранить словарь в хранилище телефона
*/

export const $offlineMode = createStore(false);
