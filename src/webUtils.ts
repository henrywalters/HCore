export default class WebUtils {
    public static isMobile(): boolean {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
}