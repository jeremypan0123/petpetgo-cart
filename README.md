# petpetgo-cart
實作電商購物車界面，包含增減商品、調整商品數量與計算總價

# 使用的架構及UI Library
React.js / Next.js / Blueprint / Styled Component

# 完成的功能:

## 功能需求

✅ 1. 自行設計 UI，以手機版面為主即可，無需考慮 RWD

✅ 2. 請自行建立 mock 的商品資料，商品圖片可以直接放在專案 public 底下

✅ 3. 一列商品的資訊必須包含

    ✅ 1. 商品圖片
    
    ✅ 2. 商品價格
    
    ✅ 3. 商品數量
    
    ✅ 4. 調整數量的元件（調為 0 時等同於刪除）
    
    ✅ 5. 刪除鈕
    
✅ 4. 購物車需要可以新增商品，加入時可選擇商品項目及數量

✅ 5. 購物車內須顯示總計

✅ 6. 包含一個置底按鈕，點擊後前往結帳成功頁並顯示：`結帳完成`


## 實作要求

✅ 1. 使用 React 做開發框架，並整合任一套 UI Library

✅ 2. 使用 functional component 開發，並維持風格一致

✅ 3. 建立 route

    ✅ 1. 購物車頁：`/cart`
    
    ✅ 2. 結帳成功頁：`/checkoutSuccess`
    
✅ 4. 切分你的 components

✅ 5. 使用 React context api 做資料管理，將購物車內容存放在 context 內

6. 選擇下述至少一項完成，並在 README 內註記寫了哪些功能

    ❌ 1. 整併 typescript，定義各個元件的介面
    
    ✅ 2. 在 context 模擬 async 行為，寫入資料時不允許修改商品數量，並將購物車資料寫進 localStorage，使頁面重整後資料仍然存在（hint: Promise）
    
    ✅ 3. 整合 [nextjs](https://nextjs.org/)，並使用其內建的 route system，嘗試開啟 server side render
    

✅ 7. 建立專案的方式

    ✅ 1. 自行建立專案或使用 create-react-app 套件，並上傳至自己的 github
    
    2. 使用 [codesandbox](https://codesandbox.io/) 建置專案
    
✅ 8. 請在五天內交回作業內容

## 實做細節

創造一個GlobalContext搭配React.useReducer將state及dispatcher provide給所有的Component, State及Dispatcher的資訊如下:

### State
| Key | Default Value | Purpose |
| :---: | :---: | :---: |
| cart | 從local storage取得購物車資訊, 若無則使用 { items: [] } | 購物車的資訊 |
| disableChangeAmount | false | 當寫入資料時,設定為true停止購物車裡的調整數量功能 |
| addProductToCart | {product: null, checking: false, error: null} | 當從商品頁加入Product至購物車時, 藉由checking及error來判斷商品是否成功被加入購物車 |
| error | null | 當有error發生時, 跳出相對應的error message |

### Dispatcher
| Reducer | Action | Purpose |
| :---: | :---: | :---: |
| cartReducer | 1. ADD_ITEM<br>2. ADJUST_ITEM_AMOUNT<br>3. DELETE_ITEM<br>4. CLEAR_CART | 1. 加入Product到購物車<br>2. 調整物品數量<br>3. 刪除物品<br>4. 清空購物車 |
| disableChangeAmountReducer | 1. DO_SOMETHING_ASYNC, 2. DO_SOMETHING_ASYNC_SUCCESS | 1. 停止使用修改數量功能 2. 正常使用修改數量功能 | 
| addProductToCartReducer | 1. ADD_PRODUCT_TO_CART<br>2. ADD_PRODUCT_TO_CART_SUCCESS<br>3. ADD_PRODUCT_TO_CART_FAILURE<br>4. ADD_PRODUCT_TO_CART_RESET | 1. 正在加入產品到購物車<br>2. 成功加入產品到購物車<br>3. 無法將商品加入購物車<br>4. 清空儲存的資訊 |
| errorReducer | 1. GENERAL_ERROR<br>2. CLEAR_ERROR | 1. 發生錯誤<br>2. 清空儲存的資訊 |
