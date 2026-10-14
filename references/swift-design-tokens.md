# Swift 设计 token 与检测示例

仅在 Swift 项目需要配置示例时读取。以下是适配起点，不是通用合规规则；`DS`、`UIColor(hex:)` 和组件名需按项目真实 API 替换。先检查已有 SwiftLint 配置，排除 token 定义、生成文件和第三方代码。正则命中只产生人工复核候选，不直接等于设计缺陷。不要未经请求安装 SwiftLint 或覆盖项目配置。

## SwiftLint 示例


为 Swift 项目提供自定义 SwiftLint 规则,自动检测硬编码字体、间距、颜色值。

```yaml
# .swiftlint.yml
custom_rules:
  hardcoded_color_hex:
    name: "Hardcoded Color (Hex)"
    regex: '(?:UIColor|NSColor)\(hex:\s*"#[0-9A-Fa-f]{6}"'
    message: "使用 DS.Colors token 替代硬编码 HEX 颜色值"
    severity: warning
  hardcoded_color_rgb:
    name: "Hardcoded Color (RGB)"
    regex: '(?:UIColor|NSColor)\(\s*red:\s*[\d.]+'
    message: "使用 DS.Colors token 替代硬编码 RGB 颜色值"
    severity: warning
  hardcoded_color_literal:
    name: "Hardcoded Color Literal"
    regex: '#colorLiteral\('
    message: "使用 DS.Colors token 替代 color literal"
    severity: warning
  hardcoded_font:
    name: "Hardcoded Font"
    regex: 'UIFont\(\s*name:\s*"'
    message: "使用 DS.Typography token 替代硬编码字体名"
    severity: warning
  hardcoded_system_font:
    name: "Hardcoded System Font with Size"
    regex: 'UIFont\.systemFont\(ofSize:\s*\d+'
    message: "使用 DS.Typography token 替代硬编码系统字体大小"
    severity: warning
  hardcoded_spacing_constraint:
    name: "Hardcoded Spacing (Constraint)"
    regex: 'NSLayoutConstraint.*constant\s*=\s*\d+'
    message: "使用 DS.Spacing token 替代硬编码间距值"
    severity: warning
  non_standard_spacing:
    name: "Non-Standard Spacing Value"
    regex: '(?:spacing|padding|margin|inset).*?=\s*(?!(?:4|8|12|16|20|24|32|40|48|56|64|72|80|96)\b)\d+'
    message: "间距值应为 4pt 网格的倍数(4, 8, 12, 16, 24, 32, 48, 64...)"
    severity: warning
  custom_button_instead_of_design_system:
    name: "Custom Button Instead of Design System"
    regex: 'UIButton\(\s*type:\s*\.custom\)'
    message: "优先使用 DS.PrimaryButton / DS.SecondaryButton 替代自定义按钮"
    severity: warning
  hardcoded_sf_symbol:
    name: "Hardcoded SF Symbol"
    regex: 'UIImage\(systemName:\s*"'
    message: "使用 DS.Icons token 替代硬编码 SF Symbol 名称"
    severity: warning
  hardcoded_icon_size:
    name: "Hardcoded Icon Size"
    regex: '\.symbolConfiguration\(|\.configuration\(pointSize:\s*\d+'
    message: "使用 DS.IconSize token 替代硬编码图标尺寸"
    severity: warning
```

---

## 11. Design Token 架构完整代码

```swift
enum DS {
    enum Colors {
        static let primary = UIColor(hex: "#FF6B35")
        static let secondary = UIColor(hex: "#2D3436")
        static let accent = UIColor(hex: "#00B894")
        static let surface = UIColor(hex: "#FAFAFA")
        static let onSurface = UIColor(hex: "#1A1A1A")
    }
    enum Typography {
        static let heading1 = UIFont.systemFont(ofSize: 32, weight: .bold)
        static let heading2 = UIFont.systemFont(ofSize: 24, weight: .semibold)
        static let body = UIFont.systemFont(ofSize: 16, weight: .regular)
        static let caption = UIFont.systemFont(ofSize: 12, weight: .regular)
    }
    enum Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
        static let xxl: CGFloat = 48
    }
    enum Icons {
        static let search = "magnifyingglass"
        static let settings = "gearshape"
        static let close = "xmark"
        static let add = "plus"
        static let delete = "trash"
        static let edit = "pencil"
        static let share = "square.and.arrow.up"
        static let download = "arrow.down.circle"
    }
    enum IconSize {
        static let xs: CGFloat = 16
        static let sm: CGFloat = 20
        static let md: CGFloat = 24
        static let lg: CGFloat = 32
    }
}
```

---

