// widgets https://docs.flutter.dev/ui/widgets/material

import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  final String _title = "Flutter VCode";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: _title, home: Home());
  }
}

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  late TextEditingController _tel;
  late TextEditingController _code;

  var isCodeEnabled = false;
  var sendCodeContent = "send code";
  var token = "";
  var count = 0;
  var isSubmitable = false;

  Future<String> fetchToken() => Future.delayed(const Duration(seconds: 1), () {
        return "fake token";
      });

  @override
  void initState() {
    super.initState();
    _tel = TextEditingController();
    _code = TextEditingController();
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    _tel.dispose();
    _code.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Home")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _tel,
              decoration: const InputDecoration(labelText: "Tel"),
              onChanged: (value) => setState(() {
                isCodeEnabled = value.isNotEmpty;
              }),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _code,
              decoration: InputDecoration(
                  enabled: isCodeEnabled,
                  labelText: "code",
                  suffix: MaterialButton(
                    onPressed: () async {
                      if (count != 0) {
                        return;
                      }

                      token = await fetchToken();
                      for (; count < 60; count++) {
                        await Future.delayed(const Duration(seconds: 1));
                        setState(() {
                          sendCodeContent = "${60 - count}s";
                        });
                      }
                      setState(() {
                        sendCodeContent = "send code";
                        count = 0;
                      });
                    },
                    child: Text(sendCodeContent),
                  )),
              onChanged: (value) => setState(() {
                isSubmitable = value.isNotEmpty && token.isNotEmpty;
              }),
            ),
          ),
          Padding(
              padding: const EdgeInsets.all(8.0),
              child: MaterialButton(
                  color: Theme.of(context).primaryColor,
                  textColor: Theme.of(context).primaryTextTheme.button?.color,
                  onPressed: () {
                    if (!isSubmitable) {
                      return;
                    }
                    print("pressed");
                  },
                  child: const Text("submit"))),
        ],
      ),
    );
  }
}
