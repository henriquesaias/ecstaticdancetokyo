import { Accordion, AspectRatio, Heading, Image, Flex, Button, Separator, Text, Span, List, Link, Box } from '@chakra-ui/react'
import { subscribe } from '../utils/subscribe'
import { keyframes } from '@emotion/react'  // for neon animation

const QAitems = [
  {
    value: "1",
    question: "実際エクスタティックダンスに参加したことがなくてもコミュニティーに入れますか？",
    answer: <>
      <Text><strong>もちろん大丈夫です♪</strong></Text>
      <Text>初めましての方もレギュラーの方もオンラインで一緒に繋がりましょう☻</Text>
    </>
  },
  {
    value: "2",
    question: "ダンス経験がなくても参加できますか？",
    answer: <>
      <Text><strong>もちろん大歓迎です！</strong></Text>
      <Text>上手下手、正解間違いなど関係なく、身体を自由に動かす踊る瞑想です。</Text>
      <Text>ステップも覚える振付けもありません。</Text>
      <Text>踊るだけでなく心と身体をリンクさせることに重点をおいてます☻</Text>
    </>
  },
  {
    value: "3",
    question: "顔出しが恥ずかしいので、カメラはオフでもいいですか？",
    answer: <>
      <Text><strong>可能な限りONでお願いしています♪</strong></Text>
      <Text>参加者が画面上で互いを認識しながら繋がることで「仲間意識」が生まれます。</Text>
      <Text>見られること発言することに慣れることで自己成長を促したり体験の深さも変わってくるので可能な限りオンをお勧めしています。やむを得ない場合はオフでも大丈夫です。</Text>
    </>
  },
  {
    value: "4",
    question: "自宅が狭くても踊れますか？",
    answer: <>
      <Text><strong>2畳ほどのスペースがあれば十分です！</strong></Text>
    </>
  },
  {
    value: "5",
    question: "途中参加・途中退出はできますか？",
    answer: <>
      <Text><strong> 可能です。</strong></Text>
      <Text>エクスタティックダンスは流れを大切にしているので、できるだけ時間通りの参加をおすすめしています。</Text>
      <Text>グループクラスは初めからのご参加をお願いしています。</Text>
    </>
  },
  {
    value: "6",
    question: " 忙しくて毎回参加できないかもしれません。",
    answer: <>
      <Text><strong>大丈夫です。</strong></Text>
      <Text>ライブ参加できなくても、グループクラス・エクスタティックダンス共に30日間アーカイブ視聴が可能です。</Text>
    </>
  },
  {
    value: "7",
    question: "スマホでも参加できますか？",
    answer: <>
      <Text><strong>はい、可能です。</strong></Text>
      <Text>ただし音量に限界があるため、ブルーツースイヤホンやヘッドフォンがおすすめです。</Text>
    </>
  },
  {
    value: "8",
    question: "エクスタティックダンスだけのコミュニティですか？",
    answer: <>
      <Text><strong>エクスタティックダンスを主軸とする、</strong><span className="highlight">コンシャスコミュニティー</span><strong>です。</strong></Text>
      <Text>コンシャスコミュニティーとは、マインドフルなライフスタイルに意識を向ける集団を差し、価値観を共有し互いに協力し合うことで、意識を高め合いながらより良い社会の実現を目指します。</Text>
      <Text>「第２の居場所」のようなアットホームなコミュニティーです☻</Text>
    </>
  },
  {
    value: "9",
    question: "ジャーナリングやノートワークは必須ですか？",
    answer: <>
      <Text><strong>必須ではありません。</strong></Text>
      <Text>あくまで「おすすめのツール」としてご紹介しています。書きたい時は書き、感じたい時は感じ、踊りたい時は踊り、休みたい時はお休みする等ご自身のリズムを大切に♪</Text>
    </>
  },
  {
    value: "10",
    question: "EMIさんと交流したいだけの理由で参加してもいいですか？",
    answer: <>
      <Text><strong>もちろんです☻☻</strong></Text>
      <Text>このコミュニティーは成長と繋がりの場であると同時に、海外にいるEMIの経験やインターナショナルなコネクションを共有する場でもあります。お茶会やウィメンズサークルも開催しますのでお楽しみに♪</Text>
    </>
  },
  {
    value: "11",
    question: "お茶会やウィメンズサークルでは何をしますか？",
    answer: <>
      <Text><strong>その時集まったメンバーの「今」感じていることを仲間と共有する温かいアットホームな時間です♪</strong></Text>
      <List.Root>
        <List.Item>最近の気づき、日常での変化、モヤモヤや悩み事、近況報告など、リラックスしながら分かち合っていきます。仲間と絆を深める時間です。話さなくても、聞いているだけでもOKです♪</List.Item>
      </List.Root>
    </>
  },
  {
    value: "12",
    question: "プライベートレッスンやセッションも月額プランに含まれますか？",
    answer: <>
      <Text><strong>含まれていませんが、<span className='highlight'>優先的</span>に予約を受け付けています♪</strong></Text>
      <Text>ワークショップやプログラムは<span className='highlight'>メンバー限定価格</span>で受講いただけます。</Text>
    </>
  },
  {
    value: "13",
    question: "最低どのぐらい続けてみるのがおすすめですか？",
    answer: <>
      <Text>このコミュニティは「一度体験して終わり」ではなく、継続する事で心身に変化が現れ始める３か月がお勧めです。定期的にメンテナンスできる場として是非ご自分のペースで続けてみて下さい♪</Text>
    </>
  },
  {
    value: "14",
    question: "退会する場合の手順を教えて下さい。",
    answer: <>
      <List.Root variant='marker'>
        <List.Item>以下の手順でできます：</List.Item>
      </List.Root>
      <Text>「カスタマーポータルURL」をクリック⇨自分のメールアドレスを入力⇨認証コード（メールで届く）を入力⇨「サブスクリプションを管理する」をクリック⇨「キャンセル」ボタンを押す⇨完了</Text>
    </>
  }
]

const OnlineCommunity = () => {

  const neonBlink = keyframes`
    0%,100% { box-shadow: 0 0 6px rgba(255,165,0,0.4); border-color: rgba(255,165,0,0.6); }
    50% { box-shadow: 0 0 18px rgba(255,165,0,0.9); border-color: rgba(255,165,0,1); }
  `;

  return (<>
    {/* 新着アップデートカード */}
    {/* box for update card with neon animation */}
    <Box
      maxWidth="lg"
      mx="auto"
      my={12}
      p={6}
      border="2px solid"
      borderColor="orange.500"
      borderRadius="md"
      bgGradient="radial(circle at top center, orange.100, orange.50)"
      position="relative"
      // create a keyframe using emotion
      animation={`${neonBlink} 1.5s infinite`}
      _before={{
        content: '""',
        position: 'absolute',
        top: '-4px',
        left: '-4px',
        right: '-4px',
        bottom: '-4px',
        border: '2px solid',
        borderColor: 'orange.500',
        borderRadius: 'md',
        animation: `${neonBlink} 1.5s infinite`,
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: '-8px',
        left: '-8px',
        right: '-8px',
        bottom: '-8px',
        border: '2px solid',
        borderColor: 'orange.300',
        borderRadius: 'md',
        animation: `${neonBlink} 1.5s infinite`,
        zIndex: -1
      }}
    >

      <Heading as="h3" size="2xl" mb={6} borderBottom="2px solid #f06e06" className="highlight">
        💌 新しいお知らせ 💌
      </Heading>
      <Text mb={4}><span className="highlight">単発</span>でのご参加チケットが購入可能になりました！</Text>
      <Flex direction="column" gap={4} mb={6}>
        <Button
          size="lg"
          target="_blank"
          colorPalette="orange"
          width="100%"
          variant="outline"
          onClick={() => window.open('https://buy.stripe.com/fZu3cw4C1dmRbiCbc54F206', '_blank')}
        >
          エクスタティックダンス 1回券を購入
        </Button>
        <Button
          size="lg"
          target="_blank"
          colorPalette="orange"
          width="100%"
          variant="outline"
          onClick={() => window.open('https://buy.stripe.com/aFa4gA6K996BdqKcg94F205', '_blank')}
        >
          グループムーブメントクラス 1回券を購入
        </Button>
      </Flex>

      <Text fontWeight="bold" mb={2}>サブスクリプションプラン</Text>
      <Flex direction="column" gap={4}>
        <Button
          size="lg"
          target="_blank"
          colorPalette="orange"
          width="100%"
          variant="outline"
          onClick={() => subscribe('monthly')}
        >
          月額（初月無料）
        </Button>
        <Button
          size="lg"
          target="_blank"
          colorPalette="orange"
          width="100%"
          variant="outline"
          onClick={() => subscribe('yearly')}
        >
          年額（初月無料）
        </Button>
        <Button
          size="lg"
          target="_blank"
          colorPalette="orange"
          width="100%"
          variant="outline"
          onClick={() => window.open('https://buy.stripe.com/eVqbJ25G54Qlaey5RL4F204', '_blank')}
        >
          再入会（月額・無料トライアルなし）
        </Button>
      </Flex>
    </Box>

    <Heading className='highlight' as="h4" size="xl" mb={2}>
      2026年2月2日オープン！1月11日募集開始
    </Heading>
    <Text mb={2} className='highlight'>ただいま初期メンバー募集中</Text>
    <Text mb={8} className='highlight'>初月は無料でご参加いただけます♪</Text>

    <Heading as="h4" size="xl" mb={8}>
      【月額制】心身を整え波動を高める
    </Heading>

    <Heading as="h1" size="3xl" fontWeight={700} fontStyle="italic" mb={8}>
      Ecstatic Dance Tokyo Community
    </Heading>

    <Text fontWeight="bold" mb={8}>
      -踊りを日常のセルフケアと生きる術へ-
    </Text>

    <Image
      mb={8}
      src="11.webp"
    />

    <Heading as="h4" size="xl" mb={6}>
      身体を<span className='highlight'>「癒しと変容のツール」</span>へ
    </Heading>

    <Heading as="h4" size="xl" mb={6}>
      心/身体/エネルギーを整える<span className='highlight'>毎月のリセットタイム</span>
    </Heading>

    <Heading as="h4" size="xl" mb={6}>
      感じながら踊り、目覚め、<span className='highlight'>人生を動かす</span>
    </Heading>

    <Image
      mb={8}
      src="12.webp"
    />

    <Heading as="h4" size="xl" mb={8} textAlign="center">
      会場の臨場感を画面上でも！
    </Heading>
    <Button
      mb={8}
      size="lg"
      target="_blank"
      colorPalette="orange"
      width="100%"
      variant="outline"
      onClick={() => subscribe('monthly')}
    >
      今すぐ申し込む　（初月無料！）
    </Button>

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>
      オンラインコミュニティについて
    </Heading>

    <AspectRatio maxW={400} ratio={9 / 16} my={8} mx="auto">
      <iframe
        src="https://youtube.com/embed/6AZmIdXH--w"
        allowFullScreen
      />
    </AspectRatio>

    <Text mb={8}>
      このオンラインコミュニティは、安心感の中で<span className='highlight'>心と身体をひらき、ポテンシャルを開花させ、本来の自分に目覚めること</span>を目的とした場です。
    </Text>

    <Text mb={8}>
      ただ踊るだけではなく、感情エネルギーの循環、習慣づくりを通して<span className='highlight'>心と身体をリンクさせ、自己表現力を磨き上げ、本来の自分を目覚めさせるプロセス</span>を大切にしています。
    </Text>

    <Text mb={8}>
      月２回のオンラインクラスとエクスタティックダンスを通して、踊りの感覚を「一時的な体験」で終わらせず、日常や生き方へと活かしていきます。
    </Text>

    <Text mb={8}>
      エクスタティックダンス東京主宰・ファシリテーター EMI のダンス/ムーブメント/マッサージのバックグラウンドや海外経験をベースに、<span className='highlight'>身体を癒しと変容のツール</span>として使う感覚を育み、心と身体の両方を整えていく<span className='highlight'>実践型・体感型のコミュニティ</span>です。
    </Text>

    <List.Root mb={8} variant="plain">
      <List.Item>「自由に自己表現したい」</List.Item>
      <List.Item>「もっと深く身体と繋がりたい」</List.Item>
      <List.Item>「軽やかに生きたい」</List.Item>
      <List.Item>「将来ファシリテーターとして活動したい」</List.Item>
      <List.Item>「コミュニティの一員として繋がりを深めたい」</List.Item>
    </List.Root>

    <Text mb={8}>そんな方のために継続的に学び、成長し、高め合うオンラインコミュニティです。</Text>

    <Flex justifyContent="space-evenly" flexWrap="wrap" gap={4} mb={8}>
      <Image maxH={400} src="13.webp" />
      <Image maxH={400} src="14.webp" />
    </Flex>

    <Heading as="h3" size="2xl" fontWeight="800" mb={8}>継続することで何が起こる？</Heading>

    <Text mb={8}>
      身体の内側で何が起きているのかを感じる力を育み、それを動きとして外側に表現していくプロセスは、浄化・ヒーリング・変容そのもの。
    </Text>

    <Text mb={8}>
      本来の自分を目覚めさせるためには、<span className="highlight">回路を開き、育て続けることが鍵</span>。<br />
      オンラインでの継続は、その状態を「一度限りの特別体験」に終わらすことなく、<strong>何度も思い出しながら当たり前の状態へと定着させるための場です。</strong>

    </Text>

    <Text mb={8}>
      ここで発信する内容を継続していくことで、滞っていたエネルギーが流れ始め、<span className='highlight'>ボディー・マインド・エネルギー状態の変化</span>を体感できるように。
    </Text>

    <Text mb={8}>
      それらをちゃんと日常に落とし込むことで、在り方、人との関わり方、生き方に変化が現れ、自然な形で人生が軽やかに動き出し始めるのをきっと実感できるはずです。
    </Text>

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>オンラインコミュニティーに参加するメリット</Heading>

    <List.Root mb={2}>
      <List.Item>どんな時も安心して戻ってこれる居場所と仲間の存在</List.Item>
      <List.Item>場所を選ばずご自分のペースで継続できる</List.Item>
      <List.Item>一人では続かないことも、自然に継続できる</List.Item>
      <List.Item>コミュニティとしての共同体意識が深まる</List.Item>
      <List.Item>普段出せない部分もご自身の安全空間で解放できる</List.Item>
      <List.Item>孤独感を感じることなく仲間と一緒に成長できる安心感</List.Item>
      <List.Item>グループクラス→エクスタティックダンスの流れで着実な変化がでやすい</List.Item>
      <List.Item>踊りが１回限りの特別な体験から在り方の変化へ</List.Item>
      <List.Item>海外のエクスタティックダンスDJやファシリテーターとの繋がれるチャンス</List.Item>
      <List.Item><span className="highlight" style={{ textDecoration: 'underline' }}>メンバー限定イベント割引</span>やその他ボーナス特典をゲットできる(これお得です！)</List.Item>
    </List.Root>

    <Image
      mb={8}
      mx="auto"
      maxH={400}
      src="15.webp"
    />

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>オンラインダンスの内容</Heading>

    <Text>毎月２回</Text>

    <List.Root mb={8}>
      <List.Item mb={8}><strong>１.テーマ別グループクラス６０分</strong>
        <List.Root variant="plain">
          <List.Item>（第２金曜20:30-21:30）</List.Item>
          <List.Item>身体の基盤を丁寧に整えながら、毎月テーマに沿って感覚的に踊るステップをガイド♪</List.Item>
          <List.Item>最終的に音に身を委ね、考えずに感じながら踊れる状態へと心と身体を開いていきます</List.Item>
          <List.Item>〇 感覚的に踊るコツや動きの基礎が身につく</List.Item>
          <List.Item>〇 しなやかな身体作りとフロームーブメントを習得</List.Item>
          <List.Item>〇 感じていることを踊りで表現できるようになる（感情/自己表現力↑）</List.Item>
          <List.Item>〇 心と身体のつながりを深めるムーブメント</List.Item>
        </List.Root>
      </List.Item>

      <Text mb={2}><strong>２.エクスタティックダンス９０－１２０分</strong></Text>
      <List.Root variant="plain">
        <List.Item>（第４水曜20:30-22:30）</List.Item>
        <List.Item>　現場の体験を時空を超えオンラインでも！</List.Item>
        <List.Item>　〇新しい月に入る前の月末リセットタイム</List.Item>
        <List.Item>　〇滞ったエネルギーの循環＋活性に最適</List.Item>
      </List.Root>
    </List.Root>

    <Text className='highlight'>☝️おススメの流れ</Text>

    <Text mb={2}>
      <strong>基礎＋応用</strong>：グループクラスで動きを身につける
    </Text>
    <Text mb={2}>⇩</Text>
    <Text mb={8}><strong>実践</strong>：エクスタティックダンスで感じていることを表現する場として腑に落としていく</Text>

    <Image
      mb={8}
      mx="auto"
      maxWidth={400}
      src="16.webp"
    />

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>こんな方へ</Heading>

    <List.Root mb={8}>
      <List.Item>心身を整える術を身につけたい</List.Item>
      <List.Item>頭で考えすぎる癖を手放したい</List.Item>
      <List.Item>感情を身体にため込まずに上手に循環させたい</List.Item>
      <List.Item>必要な発想やインスピレーションが得られる</List.Item>
      <List.Item>自己表現が苦手で自信を持ちたい</List.Item>
      <List.Item>輝きと潤いが増し惹きつける存在に</List.Item>
      <List.Item>自己探求に興味はあるけど難しい理論は苦手と感じる</List.Item>
      <List.Item>同じ意識の仲間と繋がりたい</List.Item>
      <List.Item>定期的にメインテナンスしたい</List.Item>
      <List.Item className="highlight">ファシリテーターやムーブメントファシリテーターとして今後活動したい（エクスタティックダンス東京で活躍できるサポート有）</List.Item>
    </List.Root>

    <Image
      mb={8}
      src="17.webp"
    />

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>期待できる変化</Heading>

    <List.Root mb={8}>
      <List.Item>頭がクリアになり心も身体も軽くなる</List.Item>
      <List.Item>心とマインドが整い安定した状態が保てる</List.Item>
      <List.Item>波動エネルギーが上がり引き寄せ体質に</List.Item>
      <List.Item>必要な時に発想やインスピレーションが得られる</List.Item>
      <List.Item>感覚的に楽に人生生きれるように</List.Item>
      <List.Item>輝きが増ししなやかで潤う存在に</List.Item>
      <List.Item>生き方や人間関係に変化が現れる</List.Item>
      <List.Item>人生が加速化する</List.Item>
    </List.Root>

    <Image
      mb={8}
      src="18.webp"
    />

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>含まれる内容</Heading>

    <List.Root>
      <List.Item>【毎月】６０分のグループクラス（第２金曜20:30-21:30）</List.Item>
      <List.Item>【毎月】１２０分のオンライン上のエクスタティックダンス（第４水曜20:30-22:30）</List.Item>
    </List.Root>
    <Text className='highlight' mb={".5em"}> - ボーナス特典 -</Text>
    <List.Root mb={8}>
      <List.Item>【毎月】５分のミニコンテンツ配信 ⇨ 即実践できる！<span className="highlight">ソマティックセルフケア</span> （身体に還り心をケアする方法）の紹介</List.Item>
      <List.Item>【毎月】おすすめトラック共有</List.Item>

      <List.Root variant="plain">
        <List.Item>「落ち込んでる時にアガル！」等のヒントつき</List.Item>
      </List.Root>

      <List.Item>【毎月】月のテーマに沿ったメッセージ投稿</List.Item>
      <List.Item>【ほぼ毎月】ティータイム~緩みながらみんなでキャッチアップ~</List.Item>
      <List.Item>【不定期】ウィメンズサークル~安心して胸の内を語り合う交流とサポートの場~</List.Item>
      <List.Item>【不定期】ゲストライブ~海外エクスタティックダンスコミュニティーのファシリテーターやDJを招いての質問と交流の場~</List.Item>
      <List.Item>【不定期】エシカル情報発信 ⇨ 健康と環境に優しい生活役立ちヒント</List.Item>
      <List.Item>毎月のエクスタティックダンス参加費｜<span className='highlight'>メンバー限定割引</span></List.Item>
      <List.Item>WSやトレーニングコース｜<span className='highlight'>メンバー限定価格</span>で参加・受講可能</List.Item>
      <List.Item className='highlight'>海外リトリート先行案内＆割引</List.Item>
      <List.Item>個別セッションの優先受付：</List.Item>
      <List.Root variant="plain">
        <List.Item>【1:1レッスン・セッション】プライベートレッスン、生まれ持った使命を読み解く星読み</List.Item>
        <List.Item>【1:1コーチング】エクスタティックダンスコミュニティを始めたい、ファシリテーター/ムーブメントファシリテーターとして活動したい方への直接指導</List.Item>
      </List.Root>
    </List.Root>

    <Text>※ダンス/クラスのアーカイブ残ります</Text>
    <Text>※特典もアーカイブ残ります</Text>

    <Separator my={8} />

    <Heading as="h3" size="2xl" mb={8}>開催日時</Heading>

    <Text mb={2}>〇グループクラス　</Text>
    <Text mb={8}>　毎月第２日曜日　20:30-21:30</Text>

    <Text mb={2}>〇エクスタティックダンス　</Text>
    <Text>　毎月第４水曜日　20:30-22:30</Text>

    <Separator my={8} />

    <Heading as="h3" size="2xl" mb={8}>
      月額費
    </Heading>

    <List.Root mb={8}>
      <List.Item>月3300円（初月無料トライアルつき）</List.Item>
      <Button
        mb={8}
        size="lg"
        target="_blank"
        colorPalette="orange"
        width="100%"
        variant="outline"
        onClick={() => subscribe('monthly')}
      >
        月額費を申し込む
      </Button>

      <List.Item>
        年会費33,000円（初月無料＋その後一括払いで2か月分無料＝<span className='highlight'>計３か月分お得</span>）
      </List.Item>
      <Button
        mb={8}
        size="lg"
        target="_blank"
        colorPalette="orange"
        width="100%"
        variant="outline"
        onClick={() => subscribe('yearly')}
      >
        年会費を申し込む
      </Button>

      <Button
        mb={8}
        size="lg"
        target="_blank"
        colorPalette="orange"
        width="100%"
        variant="outline"
        onClick={() => window.open('https://buy.stripe.com/eVqbJ25G54Qlaey5RL4F204', '_blank')}
      >
        再入会（月額・無料トライアルなし）
      </Button>
    </List.Root>

    <Separator my={8} />

    <Heading as="h3" size="2xl" mb={8}>
      ご準備いただくもの
    </Heading>

    <List.Root>
      <List.Item>パソコンかスマホ</List.Item>
      <List.Item>フェイスブックアカウント</List.Item>
      <Text mb={2}>アカウントがない方はお手数ですが開設願います（プライベートグループご招待のため）</Text>
      <Link mb={2} href="https://principled-ethernet-41a.notion.site/Facebook-2e2e7ef4828e808d9314c4f70c006712" target="_blank">
        新規アカウント開設方法はこちら
      </Link>
      <List.Item>動きやすい服</List.Item>
      <List.Item>身体を動かせるスペース</List.Item>
      <List.Item>ブルーツースヘッドフォンかイアフォン</List.Item>
    </List.Root>
    <Text>（あればでOK）</Text>

    <Separator my={8} />

    <Heading as="h3" size="2xl" mb={8}>
      入会日や引き落としに関して
    </Heading>

    <List.Root mb={8}>
      <List.Item>月額費は決済完了した日から３０日後に自動引き落としとなります。</List.Item>
      <List.Item>３０日間の無料トライアル期間中は、料金は一切発生しません。</List.Item>
      <List.Item>お客様ご自身でキャンセルしない限り毎月自動的に課金されます。</List.Item>
    </List.Root>

    <Text mb={2}>月額プランを購入した場合の例：</Text>
    <Text>2月2日にご購入 → 2月2日より無料トライアル開始→ 3月4日より自動引き落とし</Text>

    <Separator my={8} />


    <Button
      mb={8}
      size="lg"
      target="_blank"
      colorPalette="orange"
      width="100%"
      variant="outline"
      onClick={() => subscribe('monthly')}
    >
      月額メンバーシップお申込みの方はこちら
    </Button>

    <Button
      mb={8}
      size="lg"
      target="_blank"
      colorPalette="orange"
      width="100%"
      variant="outline"
      onClick={() => subscribe('yearly')}
    >
      一括年会費お申込みの方はこちら
    </Button>

    <Button
      mb={8}
      size="lg"
      target="_blank"
      colorPalette="orange"
      width="100%"
      variant="outline"
      onClick={() => window.open('https://buy.stripe.com/eVqbJ25G54Qlaey5RL4F204', '_blank')}
    >
      再入会（月額・無料トライアルなし）
    </Button>

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>
      よくある質問
    </Heading>


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

    <Heading as="h3" size="2xl" mb={8}>
      お問い合わせ
    </Heading>

    <Text mb={2}><Link href="mailto:facilitatoremi@gmail.com" target="_blank">✉ facilitatoremi@gmail.com</Link></Text>
    <Text mb={8}><Link href="mailto:ecstaticdancetokyo@gmail.com" target="_blank">✉ ecstaticdancetokyo@gmail.com</Link></Text>

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>
      ファシリテーター
    </Heading>

    <Image
      mx="auto"
      maxW={400}
      mb={8}
      src="19.webp"
    />

    <Heading as="h4" size="xl" mb={4} textTransform="uppercase" fontStyle='italic' fontWeight="bold">
      Emi Tanaka
    </Heading>

    <Text mb={8}>エクスタティックダンス東京主宰<br />
      ムーブメントファシリテーター・スペースホルダー・セラピスト</Text>

    <Text mb={8}>1984年、オランダ生まれニューヨーク育ちの帰国子女。<br />
      幼い頃から型にはまるのが苦手で、ルールや「皆と同じ」に違和感を感じながら過ごす。<br />
      20代で発覚した甲状腺の病気をきっかけに心身を整える学びの道へ。</Text>

    <Text mb={8}>2019年バリ島でエクスタティックダンスと出会い、その時味わった衝撃と解放による本質の目覚めを機に、エクスタティックダンス東京を立ち上げる。</Text>

    <Text mb={8}>身体をツールとし変容を促し本来の自分へと還るためのムーブメントファシリテーションを国内外で指導。</Text>

    <Text mb={8}>ボディーワーク、プラントメディスン、エネルギーワーク、マインドセットコーチング、ファシリテーション等を総合的に学んでいる。</Text>

    <Text mb={8}>心身を解放し可能性を開花させ、自分らしい人生を切り開くためのサポートやセッション、ワークショップやイベントを開催。</Text>

    <Text mb={8}>現在は東京とポルトガルを拠点に活動し、両国の架け橋となるプロジェクトを始動中。</Text>

    <Separator mb={8} />

    <Heading as="h3" size="2xl" mb={8}>
      <Link href="https://principled-ethernet-41a.notion.site/2dfe7ef4828e804e83a4d9759da5f84d" target="_blank"> 特定商取引法に基づく表記</Link>
    </Heading>
  </>
  )
}

export default OnlineCommunity
