import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

class LitecmsWebView extends StatefulWidget {
  const LitecmsWebView({super.key});

  @override
  State<LitecmsWebView> createState() => _LitecmsWebViewState();
}

class _LitecmsWebViewState extends State<LitecmsWebView> {
  late final WebViewController controller;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            setState(() => isLoading = true);
          },
          onPageFinished: (_) {
            setState(() => isLoading = false);
          },
          onWebResourceError: (error) {
            debugPrint('Error: ${error.description}');
          },
        ),
      )
      ..loadRequest(
        Uri.parse('http://192.168.1.111:5174'),
      );
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;

        if (await controller.canGoBack()) {
          controller.goBack();
        } else {
          if (context.mounted) {
            Navigator.of(context).pop();
          }
        }
      },
      child: AnnotatedRegion<SystemUiOverlayStyle>(
        // 'light' makes the status bar icons white so they show up on a dark background.
        // statusBarColor ensures the Scaffold's grey color shows through perfectly.
        value: SystemUiOverlayStyle.light.copyWith(
          statusBarColor: Colors.transparent,
        ),
        child: Scaffold(
          // Set to your preferred shade of dark grey
          backgroundColor: Colors.grey[900],
          body: SafeArea(
            child: Stack(
              children: [
                WebViewWidget(controller: controller),
                if (isLoading)
                  const Center(child: CircularProgressIndicator()),
              ],
            ),
          ),
        ),
      ),
    );
  }
}