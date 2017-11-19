
export const PAGE_SIZE = 10;
export const PAGE_SIZE_Real = 5;
export const USER_DETAIL = 'userDetail';
export const DEALER_DETAIL = 'dealerDetail';
export const GROUP_DETAIL = 'groupDetail';
export const AREA = 'area';

export const API="http://localhost:1337";
 var DEALERT_ID = '';
export function setDealertid(id) {
  DEALERT_ID=id;
}
export function getDealertid() {
  return DEALERT_ID;
}
export const LoadStyle ={

};
export function dealyTime(myChart,option){
  setTimeout(function (){
    myChart.hideLoading();
    myChart.setOption(option);
  },1000);
}
