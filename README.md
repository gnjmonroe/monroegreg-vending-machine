# 자판기

This project aims to be simple and robust rather than complex and complete.

Instead of handling exception/error states with toasts and notifications problematic actions are prevented via html disabled attributes. Likewise, CSS clamp statements are preferred over managing multiple media queries.

이 프로젝트는 복잡하고 완전한 것보다는 단순하고 견고한 것을 목표로 합니다.

예외나 오류 상태를 토스트나 알림으로 처리하기보다는, 문제가 되는 동작을 HTML의 disabled 속성으로 사전에 차단합니다. 마찬가지로, 여러 개의 미디어 쿼리를 관리하는 것보다 CSS의 clamp 구문을 사용하는 방식을 선호합니다.

## 경우

There are 4 main user actions to consider:

1. Paying with card
2. Paying with cash (this includes managing cash increments)
3. Canceling the flow/purchase
4. Choosing and purchasing an item

고려해야 할 주요 사용자 행동은 총 4가지입니다:

1. 카드로 결제하기
2. 현금으로 결제하기 (현금 단위 관리 포함)
3. 구매/진행 취소하기
4. 상품 선택 및 구매하기

## 예외 케이스

1. Insufficient funds for purchase
2. Insufficient inventory
3. Insufficient inventory and funds
4. User has a small screen device
5. User can only use a keyboard

note: refer to Limitations for more information

1. 구매 금액 부족
2. 재고 부족
3. 재고와 금액 모두 부족
4. 사용자가 작은 화면의 기기를 사용함
5. 사용자가 키보드만 사용할 수 있음

참고: 자세한 내용은 한계 사항을 참조하세요.

## 버전

Key dependencies used:

사용된 주요 의존성:

- react and react-dom @ 19.1.0
- vite @ 7.0.4
- immer @ 10.1.1
- use-immer @ 0.11.0

## 실행 방법

### 배포

Navigate to the root directory.

Development: `npm run dev`
Production: `npm run build` then `npm run preview`

루트 디렉토리로 이동하세요.

개발 환경: `npm run dev`
프로덕션 환경: `npm run build` then `npm run preview`

### 실행

There are four main components of the vending machine:

1. 3 buttons for selecting items for purchase
2. 6 buttons for selecting payment options
3. A cancel/refund button
4. A display bar at the bottom that shows the current balance and the quantity of any purchased items.

In order to purchase items, a payment option must be selected first. Selecting `Card` will enable unlimited transactions until `Cancel` is clicked. Selecting any of the other 5 payment options will increment the current balance per the selected amount.

Item selection buttons are initially disabled because the balance is 0, but when a sufficient balance exists, items can be purchased by clicking one of the buttons.

To stop purchasing items, click the Cancel/Refund button. Refresh the browser to reset all inventories and state.

자판기는 다음의 네 가지 주요 구성 요소로 이루어져 있습니다:

1. 상품 선택을 위한 버튼 3개
2. 결제 수단 선택을 위한 버튼 6개
3. 취소/환불 버튼 1개
4. 하단에 현재 잔액과 구매한 상품 수량을 표시하는 디스플레이 바

상품을 구매하려면 먼저 결제 수단을 선택해야 합니다. 카드를 선택하면 취소 버튼을 누를 때까지 무제한으로 거래할 수 있습니다. 나머지 5개의 결제 수단 중 하나를 선택하면 선택한 금액만큼 현재 잔액이 증가합니다.

상품 선택 버튼은 처음에는 잔액이 0이기 때문에 비활성화되어 있지만, 충분한 잔액이 생기면 버튼을 클릭하여 상품을 구매할 수 있습니다.

상품 구매를 중단하려면 취소/환불 버튼을 클릭하세요. 모든 재고와 상태를 초기화하려면 브라우저를 새로 고치면 됩니다.

## 한계

Data does not persist between refreshes. This would require a database or writes to a json file.

Inventory of what coins or paper notes held by the vending machine or the user is not kept. Thus proper change can not be calculated nor dispensed. This could be a future feature.

This app does not model real world failure modes such as inventory jams or failures to read card information or cash inputs.

This is designed for screen widths at least 300px. Extreme screen heights are not specially considered.

데이터는 새로 고침 시 유지되지 않습니다. 이를 위해서는 데이터베이스나 JSON 파일에 쓰기 기능이 필요합니다.

자판기나 사용자가 보유한 동전 또는 지폐의 재고는 관리되지 않습니다. 따라서 정확한 거스름돈 계산이나 지급이 불가능합니다. 이 기능은 향후 추가될 수 있습니다.

이 앱은 재고 걸림 현상, 카드 정보 인식 실패, 현금 투입 실패 등 실제 세계의 고장 상황을 모델링하지 않습니다.

화면 너비가 최소 300px 이상인 환경을 대상으로 설계되었으며, 극단적인 화면 높이는 별도로 고려하지 않았습니다.
