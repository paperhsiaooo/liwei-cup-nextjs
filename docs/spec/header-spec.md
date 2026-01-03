## Header / 行動版抽屜選單規格

- **目標**：行動版漢堡選單抽屜中，分隔線（Header 底部）與第一個選單項目的垂直距離應保持緊湊、不留過大空隙。
- **布局規格**：
  - `DrawerContent`：`gap-0 content-start`（取消額外段落距，並強制網格項目向上對齊，避免空白被均分到上下）。
  - Nav 區塊：`flex flex-col gap-2 pt-2`，確保分隔線到第一個項目距離與選單項目間距（`gap-2`）一致。
  - Header 區塊：維持 `pb-3` 與下方邊框，確保關閉按鈕區域仍有呼吸感。
- **驗收標準**：
  - 抽屜打開後，分隔線到第一個選單項（「發現好物」）的距離為小間距（`pt-1`），不再出現明顯大空白。
  - 兩個選單項彼此間距為 `gap-2`，保持一致的垂直節奏。
  - 桌面版 Header 佈局與間距不受影響。

> 更新日期：2026-01-03  
> 負責人：AI 助理（依使用者指示調整）

## Cart Drawer / 行動版購物車抽屜規格

- **目標**：購物車抽屜的頭部與內容區保持緊湊且與主選單抽屜一致的間距節奏。
- **布局規格**：
  - `DrawerContent`：`content-start gap-0 p-0`（統一移除外層內距與間距）。
  - Header：`flex flex-row items-center justify-between border-b px-4 py-3`，避免過大 padding。
  - Body：`px-4 py-4`。
  - Footer：`border-t px-4 py-4`。
- **驗收標準**：
  - 分隔線到列表首項距離與項目間距一致，不留多餘空白。
  - 標題區 padding 與主選單抽屜風格一致。

