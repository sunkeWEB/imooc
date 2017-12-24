export function getRedirectPath({type,avatar}) {
  // 根据用户信息 返回跳转地址
  //  user.type  -> /boss  or /genius
  //  user.avatar -> /bossinfo or /geniusinfo
    let url = (type === 'boss') ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}