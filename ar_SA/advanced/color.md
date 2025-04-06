# اللون

توفر حزمة "اللون" مجموعة من الوظائف لتلوين إخراج المحطة الطرفية
باستخدام [PTerm](https://github.com/pterm/pterm) المكتبة.

## لون محدد

توفر الحزمة أساليب لإنشاء طابعات لألوان محددة. هذه الطرق تسمح لك بسهولة تلوين إخراج المحطة

- `color.Red()`
- `color.Green()`
- `color.Yellow()`
- `color.Blue()`
- `color.Magenta()`
- `color.Cyan()`
- `color.White()`
- `color.Black()`
- `color.Gray()`
- `color.Default()`

### طرق الطابعة

يوفر 'contracts/support.Printer' الطرق التالية لطباعة أو تنسيق النص بلون:

- `طباعة` - نص طباعة
- 'Println' - طباعة النص مع سطر جديد
- 'الطباعة' - طباعة النص المنسق
- 'Sprint' - النص الملون للعودة
- 'Sprintln' - إرجاع النص الملون مع سطر جديد
- 'Sprintf' - نسخة النص الملون

```go
استيراد "github.com/goravel/framework/support/color"

color.Blue().Println("مرحباً، Goravel!")
color.Green().Printf("مرحباً، %s!", "Goravel")
```

## لون مخصص

### \`color.New'

الدالة "color.New" تنشئ طابعة لون جديدة. يمكنك استخدام هذا الكائن لتلوين إخراج المحطة الطرفية.

```go
استيراد "github.com/goravel/framework/support/color"

color.New(color.FgRed).Println("مرحبا، غورفل!")
```
