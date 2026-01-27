import { Accordion, Button, Flex, Heading, Image, Link, List, Separator, Span, Text } from "@chakra-ui/react"

const QAitems = [
  {
    value: "1",
    question: "ダンス経験がなくても参加できますか？",
    answer: <>
      <Text>もちろんです！</Text>
      <Text>参加者の多くがダンス未経験、または初参加です。</Text>
      <Text>振付や正解はなく、「感じたまま動く」ことが大切なので、</Text>
      <Text>上手・下手は一切関係ありません。</Text>
    </>
  },
  {
    value: "2",
    question: "一人参加でも大丈夫ですか？",
    answer: <>
      <Text> ほとんどの方がお一人参加です。</Text>
      <Text>会話をしないダンスなので、誰かと話さなくても自然にその場に溶け込めます。</Text>
      <Text>安心してご参加ください。</Text>
    </>
  },
  {
    value: "3",
    question: "子供と一緒の参加でも大丈夫ですか？",
    answer: <>
      <Text>もちろんウェルカムです！健全な空間を心掛けているエクスタティックダンスはお子さんやベビー、ファミリーでのご参加も大歓迎です！安心して参加できる大人のプレイグラウンドです♪</Text>
    </>
  },
  {
    value: "4",
    question: "エクスタティックダンスはクラブやパーティーと何が違いますか？",
    answer: <>
      <Text> 目的がまったく違います。</Text>
      <Text>クラブのようにアルコールやドラッグを介入する場ではなく健全な空間で内側とつながるための踊る瞑想として行われます。</Text>
    </>
  },
  {
    value: "5",
    question: "途中で休んだり、踊らなくてもいいですか？",
    answer: <>
      <Text>もちろんOKです。</Text>
      <Text>座ったり、横になってお休みしたり、目を閉じたりなど、ご自身のペースを大切にしてください。</Text>
      <Text>無理に踊る必要はありません。</Text>
    </>
  },
  {
    value: "6",
    question: "服装はどうしたらいいですか？",
    answer: <>
      <Text>動きやすく、リラックスできる服装がおすすめです。裸足で踊るため、靴や靴下は現地で脱いでいただきます。汗をかくこともあるので、着替えがあると安心かと思います。</Text>
    </>
  },
  {
    value: "7",
    question: "参加にあたって注意点はありますか？",
    answer: <>
      <Text>以下のガイドラインを大切にしています。</Text>
      <List.Root>
        <List.Item>ダンス中は会話をしない</List.Item>
        <List.Item>香りの強い香水は控える</List.Item>
        <List.Item>他の人のスペースと境界線を尊重する</List.Item>
        <List.Item>すべて自己責任・自己ケアで参加する</List.Item>
      </List.Root>
    </>
  },
  {
    value: "8",
    question: "男性も参加できますか？",
    answer: <>
      <Text>はい、どなたでも参加可能です。年齢・性別・国籍問わず、全ての方にウェルカムな空間です。</Text>
    </>
  },
  {
    value: "9",
    question: "どんな人におすすめですか？",
    answer: <>
      <Text>こんな方におすすめです！</Text>
      <List.Root>
        <List.Item>頭が疲れている</List.Item>
        <List.Item>ストレスや感情を解放したい</List.Item>
        <List.Item>自分の身体感覚とつながりたい</List.Item>
        <List.Item>瞑想が苦手だけど興味がある</List.Item>
        <List.Item>インスピレーションを得たい</List.Item>
        <List.Item>心身を整えたい</List.Item>
      </List.Root>
    </>
  },
  {
    value: "10",
    question: "参加後はどんな感覚になりますか？",
    answer: <>
      <Text>人それぞれですが、</Text>
      <List.Root>
        <List.Item>スッキリする</List.Item>
        <List.Item>身体が軽くなる</List.Item>
        <List.Item>エネルギーが満ちる</List.Item>
        <List.Item>リセットされた</List.Item>
        <List.Item>全てを受け入れられた</List.Item>
        <List.Item>感謝の氣持ちが湧いてくる</List.Item>
        <List.Item>幸せな空間に浸れて喜びでいっぱい</List.Item>
      </List.Root>
    </>
  }
]

const Home = () => {
  return (
    <>
      <Heading as="h3" mb={2}>エクスタティックダンス東京へようこそ！</Heading>
      <Heading as="h4" mb={8}>思考を鎮め、心身を解放し、本来の自分へ還るジャーニー</Heading>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="9.webp"
      />

      <Separator mb={8} />

      <Text mb={8}>
        エクスタティックダンス東京は、自由に踊ることを通して自分の源に還るためのコンシャスコミュニティです。<br />
        現在急速に世界中で広がっているエクスタティックダンスは、<br />
        <strong>ジャッジのない空間で、自分自身と深くつながり、他者と調和する場所。</strong><br />
        お酒やドラッグを使わず、音楽と身体の感覚だけを頼りに、<br />
        内側から突き動かされるように自由かつ感覚的踊ります。<br />
      </Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="10.webp"
      />

      <Separator mb={8} />

      <Heading as="h3" mb={8}>エクスタティックダンスとは？</Heading>

      <Text mb={8}>
        エクスタティックダンスは、<br />
        <strong>振付・正解・上手下手のない、完全に自由なダンス。</strong><br />
        音楽の波（サウンドウェーブ）に身を委ね、<br />
        今この瞬間に身体から湧き上がる感覚・感情を、そのまま動きとして表現します。<br />
        考えることを手放し、身体の叡智につながることで、<br />
        本来備わっている可能性や創造性が自然と開かれていきます。<br />
      </Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="1.webp"
      />

      <Separator mb={8} />

      <Heading as="h3" mb={8}>こんな効果が期待できます</Heading>

      <List.Root mb={8}>
        <List.Item>ストレスや思考過多からの解放</List.Item>
        <List.Item>抑圧された感情・エネルギーの解放</List.Item>
        <List.Item>心と身体、直感との再接続</List.Item>
        <List.Item>自己受容・他者受容の深化</List.Item>
        <List.Item>創造性・生命力・喜びの回復</List.Item>
      </List.Root>

      <Text mb={8}>まるで一度人生の旅を終え、生まれ変わったような感覚を味わう方も少なくありません。</Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="2.webp"
      />

      <Separator mb={8} />

      <Heading as="h3" mb={8}>こんな方におすすめ</Heading>

      <List.Root mb={8}>
        <List.Item>忙しい日常で、色々溜めこみがち</List.Item>
        <List.Item>心と身体のズレを感じる</List.Item>
        <List.Item>自分と感じ繋がる時間がない</List.Item>
        <List.Item>考えすぎて頭が休まらない</List.Item>
      </List.Root>

      <List.Root mb={8}>
        <List.Item>感情をうまく表現・消化できない</List.Item>
        <List.Item>人の目を氣にしたくない</List.Item>
        <List.Item>制限やしがらみから解放されたい</List.Item>
        <List.Item>身体の声や直感に従ってみたい</List.Item>
      </List.Root>

      <List.Root mb={8}>
        <List.Item>人と分かち合う喜びを感じたい</List.Item>
        <List.Item>自分らしさを表現していきたい</List.Item>
        <List.Item>自分にしかない輝きを放ちたい</List.Item>
        <List.Item>エネルギーを解放したい</List.Item>
        <List.Item>魂レベルで輝きたい</List.Item>
        <List.Item>安全でジャッジのないコミュニティに身を置きたい</List.Item>
      </List.Root>

      <Text mb={8}>「踊れない」と感じている方ほど、ぜひ体験してほしいダンスです♪</Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="3.webp"
      />

      <Separator mb={8} />

      <Heading as="h3" mb={8}>初めての方へ</Heading>

      <Text mb={2}>ダンス経験がなくても、踊りが苦手でも大丈夫です。</Text>
      <Text mb={2}>半数以上が初参加＆お一人でのご参加です。</Text>
      <Text mb={2}>「1人だと不安。。」「踊れない。。」というお声もいただきますが、半数以上がお一人参加でダンス未経験の方です。</Text>
      <Text mb={2}>シンプルに考えずに、感じたままに動くだけ！</Text>
      <Text mb={2}>心と身体を解放し本来の自分に還る動く瞑想です。萎縮した身体がひらいていくと他の参加者と自然と打ち解けていきます♪</Text>
      <Text mb={8}>安全な空間の中で内なる旅をそれぞれ感じて頂きますのでご安心下さい。</Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="4.webp"
      />

      <Separator mb={8} />

      <Heading as="h3" mb={8}>注意事項</Heading>

      <List.Root mb={8}>
        <List.Item>強い香りのする制汗剤や香水は避ける</List.Item>
        <List.Item>途中お手洗いや休憩したい場合は、 ご自由に休んでいただいてOKです！</List.Item>
        <List.Item>他の参加者の迷惑になる行為（誹謗中傷/セクハラ等、 他者の尊厳を奪うような行為）を発見した場合、  ファシリテーターの判断で退席して頂く場合もある事、 その際の返金は一切できかねます事をご了承下さい。</List.Item>
        <List.Item>安全な空間を心掛けてはおりますが、 イベント中に発生したお怪我・事故などに関しては、 主催者・ファシリテーターは責任を負いかねます。</List.Item>
      </List.Root>

      <Separator mb={8} />

      <Heading as="h3" mb={8}>ガイドライン</Heading>

      <List.Root mb={8}>
        <List.Item>裸足で踊る</List.Item>
        <List.Item>言葉でのお喋りNG！（叫びや衝動的に声を発することはOK）</List.Item>
        <List.Item>携帯・カメラの使用NG</List.Item>
        <List.Item>他者を尊重する</List.Item>
        <List.Item>自分の感覚を大切にする</List.Item>
      </List.Root>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="5.webp"
      />

      <Separator mb={8} />

      <Heading as="h3" mb={8}>会場について</Heading>

      <Text mb={8}>
        会場は浜田山会館ホール。<br />
        150㎡以上の広さを誇る、ミラーボール付きの開放的な空間です。<br />
        ※変更になる場合がございますがその場合イベント申込みに記載します。
      </Text>

      <Separator mb={8} />

      <Heading as="h3" mb={8}>チケットと参加について</Heading>

      <List.Root mb={8}>
        <List.Item>早割／ペア割チケットあり　※初めての方はこちらがお得です！</List.Item>
        <List.Item>初参加の方も安心してご参加いただけます</List.Item>
        <List.Item>定期的な心身のメンテナンスとしての毎月の参加もおすすめです♪</List.Item>
      </List.Root>

      <Button
        mb={8}
        size="lg"
        target="_blank"
        colorPalette="orange"
        width="100%"
        variant="outline"
        onClick={() => window.open('https://ecstaticdancetokyo.peatix.com/events')}
      >
        チケット購入
      </Button>

      <Separator mb={8} />

      <Heading as="h3" mb={8}>キャンセルポリシー</Heading>

      <Text mb={2}>チケット購入後のキャンセル・返金は承っておりません。</Text>
      <Text mb={2}>ただし交通遅延等によるやむを得ない場合、次回のイベントに回すことができますのでその際は下記のアドレスにご連絡下さい。</Text>
      <Text mb={8}><Link href="mailto:facilitatoremi@gmail.com" target="_blank">✉ facilitatoremi@gmail.com</Link></Text>

      <Separator mb={8} />

      <Heading as="h3" mb={8}>仲間の声</Heading>

      <Separator mb={8} />

      <Heading as="h3" mb={8}>よくあるご質問</Heading>

      <Accordion.Root multiple collapsible defaultValue={["1"]}>
        {QAitems.map((item, index) => (
          <Accordion.Item key={index} value={item.value}>
            <Accordion.ItemTrigger>
              <Span flex="1">{item.question}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.answer}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <Separator mb={8} />

      <Heading as="h3" mb={8}>Ecstatic Dance Tokyoの想い</Heading>

      <Text mb={2}>ここは、ただ踊る場所ではありません。</Text>
      <Text mb={2}><strong>本当の自分に還り、人生をより自由に、軽やかに生きるための場所。</strong></Text>
      <Text mb={8}>ひとりひとりが自分のリズムを取り戻し、それぞれの光を思い出すための空間です。</Text>

      <Image
        mb={8}
        maxH={350}
        mx='auto'
        src="/topbanner.webp"
      />

      <Separator mb={8} />

      <Heading as="h4" mb={8}>We look forward to dancing with you all!!</Heading>

      <Flex justifyContent="space-evenly" flexWrap="wrap" gap={4} mb={8}>
        <Image maxH={400} src="/6.webp" />
        <Image maxH={400} src="/7.webp" />
      </Flex>
    </>
  )
}

export default Home