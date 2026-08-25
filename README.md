# frameframe

## 開発ログ

このプロジェクトではClaude Codeが生成するArtifactを利用して、開発ログをWebで公開している。
開発を進める中のよしななタイミングでArtifactを生成し、それをプロジェクトの内部でドキュメントとしてGit管理する仕組みを取っている。

### 運用フロー：

1. Artifactをdocs/artifacts/に直接書いてpublish（フックがそれ以外の場所からのpublishをブロック）
2. git pushするとGitHub Pagesが自動でビルド・公開
3. https://ch00z00.github.io/frameframe/artifacts/<ファイル名>ですぐWeb閲覧可能

新しいArtifactを作る際も、同じ流れ（docs/artifacts/に書く → publish → commit → push）で自動的にWeb公開される。
