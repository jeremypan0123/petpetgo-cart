# petpetgo-cart
For demo

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
    
    ✅ 2. 使用 [codesandbox](https://codesandbox.io/) 建置專案
    
✅ 8. 請在五天內交回作業內容
