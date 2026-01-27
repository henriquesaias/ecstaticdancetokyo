import { Button, Heading, Image, List, Separator, Text } from "@chakra-ui/react"

const Support = () => {
  return (
    <>
      <Heading as='h3' mb={8}>これからエクスタティックダンスコミュニティーを始めたい方へ</Heading>

      <Text mb={8}>エクスタティックダンス東京では、コミュニティを立ち上げていくため<br />
        のサポートを行っています。</Text>

      <Text mb={8}><strong>まったくのゼロから、</strong>あるいは<strong>、今いる状況から必要に応じ、</strong><br />
        満足度の高いイベントをどう形にし、どう続けるかを一緒に整理し、<br />
        <strong>イベント運営・在り方</strong>までを含めたサポート<strong>一歩ずつ、確実に</strong><br />
        進めていきます。</Text>

      <Text className="highlight" mb={8}>
        <strong>日本ではまだコミュニティの数は少なく、成長過程の中、<br />
          コミュニティーを始めるなら今がチャンスです！</strong>
      </Text>

      <Text mb={8}>単発イベントで終わらせず、<br />
        「人が自然に集まり、安心して戻ってこられる場」を<br />
        育てるための伴走型サポートです。
      </Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="topbanner.webp"
      />

      <Separator mb={8} />

      <Heading as='h3' mb={4}>こんな方へ</Heading>

      <List.Root mb={8}>
        <List.Item>エクスタティックダンスを開催したいが、何から始めたらいいかわからない</List.Item>
        <List.Item>コミュニティを作りたいが、集客や継続に不安がある</List.Item>
        <List.Item>氣持ちはあるけど具体的なアドバイスやサポートがほしい</List.Item>
        <List.Item>世界観・雰囲気のダンス空間を大切にしたい</List.Item>
        <List.Item>ファシリテーターとしての在り方や言葉がけに迷っている</List.Item>
        <List.Item>音楽・空間創り・プログラムの流れをどう組み立てたらよいか知りたい</List.Item>
        <List.Item>海外のエクスタティックダンスの在り方も取り入れたい</List.Item>
        <List.Item>小さくても、深くつながるコミュニティを育てたい</List.Item>
      </List.Root>

      <Separator mb={8} />

      <Heading as='h3' mb={4}>サポート内容</Heading>

      <List.Root mb={0}>
        <List.Item>コミュニティのビジョン・コンセプト整理</List.Item>
        <List.Item>エクスタティックダンスの全体構成やプログラムの流れ</List.Item>
        <List.Item>ファシリテーターの心得、在り方のコーチング</List.Item>
        <List.Item>初開催〜継続開催までのステップ設計</List.Item>
        <List.Item>参加者との信頼関係・安全な場づくり</List.Item>
        <List.Item>料金設定・ゲスト出演依頼・運営の考え方</List.Item>
        <List.Item>日本・海外のエクスタティックダンス事例の共有</List.Item>
      </List.Root>
      <Text mb={8}>※状況に応じてカスタマイズします</Text>

      <Separator mb={8} />

      <Heading as='h3' mb={4}>大切にしていること</Heading>
      <Text mb={8}>エクスタティックダンスコミュニティーは世界各国コミュニティーごとに<br />
        カラーと個性が強くでます。提供するサポートに関しては、その方の<br />
        感性や感覚・価値観を尊重し、長く続く、無理のないコミュニティづくりを<br />
        応援します。
      </Text>

      <Image
        mb={8}
        maxW={350}
        mx='auto'
        src="8.webp"
      />

      <Separator mb={8} />

      <Text mb={8}>20分の無料コールでお氣軽にお問い合わせください♪</Text>
      <Button
        mb={8}
        size="lg"
        target="_blank"
        colorPalette="orange"
        width="100%"
        variant="outline"
        onClick={() => window.open('https://calendly.com/facilitatoremi/30min')}
      >
        スケジュールの確認・予約はこちらより
      </Button>
    </>
  )
}

export default Support