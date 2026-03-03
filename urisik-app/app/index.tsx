import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  Linking,
  Alert,
  Platform,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import type { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";

export default function Index() {
  const webviewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // 안드로이드 물리 뒤로 가기 버튼 제어
  useEffect(() => {
    const onAndroidBackPress = () => {
      if (webviewRef.current && canGoBack) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };

    if (Platform.OS === "android") {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onAndroidBackPress,
      );
      return () => {
        subscription.remove();
      };
    }
  }, [canGoBack]);

  // 소셜 로그인 및 외부 앱 실행 제어
  const onShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    const { url } = event;
    console.log("이동 시도하는 URL: ", url);

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://") &&
      url !== "about:blank"
    ) {
      Linking.openURL(url).catch(() => {
        Alert.alert("알림", "해당 앱을 실행할 수 없습니다.");
      });
      return false; // 웹뷰 내부에서 이동하는 것을 차단
    }
    return true; // 일반 웹 URL은 이동 허용
  };

  // 구글 로그인을 위한 User-Agent 속이기
  const CUSTOM_USER_AGENT =
    Platform.OS === "android"
      ? "Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      : "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";

  // 팝업 창을 현재 창으로 강제 변환
  const INJECT_JS = `
    window.open = function(url, target, features) {
      window.location.href = url;
      return null;
    };
    
    document.addEventListener('click', function(e) {
      var target = e.target.closest('a');
      if (target && target.getAttribute('target') === '_blank') {
        target.setAttribute('target', '_self');
      }
    });
    true;
  `;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webviewRef}
        source={{ uri: "https://urisik.vercel.app/" }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]} // 특수한 형태의 주소(ex. 카카오 로그인..)로 링크를 막지 않기 위해 -> 추후에 보한 강화시 수정 필요
        userAgent={CUSTOM_USER_AGENT}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        injectedJavaScript={INJECT_JS}
        setSupportMultipleWindows={false}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  webview: { flex: 1 },
});
