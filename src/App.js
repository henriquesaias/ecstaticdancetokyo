import { useEffect } from "react";
import { Accordion, AspectRatio, Heading, Container, Image, Flex, Button, Separator, Text, Span, List, Link } from '@chakra-ui/react';
import { Provider } from "./components/ui/provider"
import { subscribe } from './stripe';

function App() {
  useEffect(() => {
    if (window.location.hash === "#subscribe_successful") {
      alert("Add a success message");
    }
  }, [window.location.hash]);

  const QAitems = [
    {
      value: "1",
      question: "ダンス経験がなくても参加できますか？",
      answer: <>
        <Text><strong>もちろん大歓迎です！</strong></Text>
        <Text>上手下手、正解間違いなど関係なく、身体を自由に動かす踊る瞑想です。</Text>
        <Text>ステップも覚える振付けもありません。ダンス未経験や初心者の方、経験者共に歓迎です。</Text>
      </>
    },
    {
      value: "2",
      question: "顔出しが恥ずかしいので、カメラはオフでもいいですか？",
      answer: <>
        <Text><strong>どちらでも構いません♪</strong></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </>
    },
    {
      value: "3",
      question: "自宅が狭くても踊れますか？",
      answer: <>
        <Text><strong>2畳ほどのスペースがあれば十分です！</strong></Text>
      </>
    },
    {
      value: "4",
      question: "エクスタティックダンスだけのコミュニティですか？",
      answer: <>
        <Text><strong>エクスタティックダンスが主軸とする、<span className='highlight'>コンシャスコミュニティー</span>です。</strong></Text>
        <Text>コンシャスコミュニティーとは、マインドフルなライフスタイルに意識を向ける集団を差し、価値観を共有し、互いに協力し合うことで、意識を高め合ったり、より良い社会の実現を目指します。</Text>

        <List.Root>
          <List.Item>身体・感覚・感情を整える方法</List.Item>
          <List.Item>日常に落とし込めるセルフケアや習慣づくり</List.Item>
          <List.Item>新月/満月のテーマやジャーナリング法</List.Item>
          <List.Item>リチュアル</List.Item>
        </List.Root>

        <Text>など幅広い内容を発信しています。</Text>
      </>
    },
    {
      value: "5",
      question: "ジャーナリングやノートワークは必須ですか？",
      answer: <>
        <Text><strong>必須ではありません。</strong></Text>
        <Text>あくまで「おすすめのツール」としてご紹介しています。書きたい時は書き、感じたい時は感じ、踊りたい時は踊り、休みたい時はお休みする等ご自身のリズムを大切に☺</Text>
      </>
    },
    {
      value: "6",
      question: "EMIさんの世界観や考え方が好きで参加してもいいですか？",
      answer: <>
        <Text><strong>もちろんです。</strong></Text>
        <Text>このコミュニティー「自己表現・成長の場」であると同時に、EMIの海外での学びや経験を共有する場でもあります☺</Text>
      </>
    },
    {
      value: "7",
      question: "途中参加・途中退出はできますか？",
      answer: <>
        <Text><strong>可能です。</strong></Text>
        <Text>エクスタティックダンスは流れを大切にしているので、できるだけ時間通りの参加をおすすめしていますが、途中参加や退出でも大丈夫です。</Text>
        <Text>アーカイブも残ります。</Text>
        <Text>グループクラスは初めからのご参加をお願いしています。</Text>
      </>
    },
    {
      value: "8",
      question: "忙しくて毎回参加できないかもしれません。",
      answer: <>
        <Text><strong>大丈夫です。</strong></Text>
        <Text>ライブ参加できなくても、グループクラス・エクスタティックダンス共に30日間アーカイブ視聴が可能です。</Text>
      </>
    },
    {
      value: "9",
      question: "スマホでも参加できますか？",
      answer: <>
        <Text><strong>はい、可能です。</strong></Text>
        <Text>ただし音量に限界があるため、ブルーツースイヤホンやヘッドフォンがおすすめです。</Text>
      </>
    },
    {
      value: "10",
      question: "お茶会では何をしますか？",
      answer: <>
        <Text><strong>その時集まったメンバーの「今」感じていることを共有する温かいアットホームな時間です♪</strong></Text>
        <List.Root>
          <List.Item>最近の気づき</List.Item>
          <List.Item>踊って感じたこと</List.Item>
          <List.Item>日常での変化</List.Item>
          <List.Item>ちょっとしたモヤモヤ</List.Item>
        </List.Root>
        <Text>などを、リラックスしながら分かち合う時間です。</Text>
        <Text>話さなくても、聞いているだけでもOKです♪</Text>
      </>
    },
    {
      value: "11",
      question: "プライベートレッスンやセッションも月額プランに含まれますか？",
      answer: <>
        <Text><strong>含まれていませんが、<span className='highlight'>優先的</span>に予約を受け付けています♪</strong></Text>
        <Text>ワークショップやプログラムは<span className='highlight'>メンバー限定価格</span>で受講いただけます。</Text>
      </>
    },
    {
      value: "12",
      question: "最低３ヶ月参加が必要なのはなぜですか？",
      answer: <>
        <Text>このコミュニティは「一度体験して終わり」ではなく、継続によって身体と意識が変わっていくためです。変化が現れ始めるのに３か月かかります。</Text>
        <Text>また決済システムの都合上、最低３ヶ月のご参加をお願いしています。</Text>
        <Text>ご了承の上ご登録下さい。</Text>
      </>
    },
    {
      value: "13",
      question: "退会したい場合どうすればいいですか？",
      answer: <>
        <List.Root>
          <List.Item>フェイスブックコミュニティーグループにて「今月で解約します」等のメッセージを送っていただければこちらでキャンセルいたします。</List.Item>
          <List.Item>もしご自分でキャンセルされたい場合は、以下の手順でできます：</List.Item>
        </List.Root>
        <Text>「カスタマーポータルURL」をクリック⇨自分のメールアドレスを入力⇨認証コード（メールで届く）を入力⇨「サブスクリプションを管理する」をクリック⇨「キャンセル」ボタンを押す⇨完了</Text>
      </>
    },
    {
      value: "14",
      question: "いつまでにキャンセルすれば翌月請求されない？",
      answer: <>
        <Text><strong>次回請求日の前にキャンセルいただければ翌月は請求されません。</strong></Text>
        <Text>例）請求日が毎月 15日の場合</Text>
        <List.Root>
          <List.Item>14日にキャンセル → 翌月請求されない（ご利用は次回の請求日までOKです）</List.Item>
          <List.Item>15日にキャンセル → 次月の請求は発生してしまう</List.Item>
        </List.Root>
      </>
    },
  ]

  return (
    <Provider>
      <Image
        alt="Banner image"
        src="https://principled-ethernet-41a.notion.site/image/attachment%3Aca0493df-dcbc-41d1-bc7c-910b6f844523%3Aecstatic_dance_for_notion.png?table=block&id=2c3e7ef4-828e-80d1-b00d-c1d0626cd762&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=1920&userId=&cache=v2"
        className='hero-banner'
      />

      <Container mx="auto" maxW={800} py={8}>
        <Heading as="h1" size="5xl" mb={8}>
          【月額制】心と身体を整えるエクスタティックダンスコミュニティー
        </Heading>

        <Heading as="h2" size="xl" mb={8}>
          踊りを日常のセルフケアと生きる術へ
        </Heading>

        <Heading className='highlight' as="h2" size="xl" mb={2}>
          2026年2月2日オープン！初期メンバー募集中♪2026年1月11日から募集開始
        </Heading>

        <Image
          mb={8}
          src="https://principled-ethernet-41a.notion.site/image/attachment%3Ab6cf9f36-012d-4e02-8dd6-00ea89e7adcd%3Awebsite.png?table=block&id=2d6e7ef4-828e-80dd-ae53-d02e13f9ce93&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=1420&userId=&cache=v2"
        />

        <Heading as="h3" size="2xl" mb={8}>
          身体を<span className='highlight'>「癒しと変容のツール」</span>へ
        </Heading>

        <Heading as="h3" size="2xl" mb={8}>
          心・身体・エネルギーを整える<span className='highlight'>毎月のリセットタイム</span>
        </Heading>

        <Heading as="h3" size="2xl" mb={8}>
          感じながら動き、手放し、目覚め、 <span className='highlight'>人生を動かす</span>
        </Heading>

        <Image
          mb={8}
          src="https://principled-ethernet-41a.notion.site/image/attachment%3A4968aa97-9fe3-462b-8b4b-e096385c1bb6%3A207887_0.jpg?table=block&id=2c3e7ef4-828e-80be-85fc-f2c2bb5f927f&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=1420&userId=&cache=v2"
        />

        <Heading as="h4" size="xl" mb={8} textAlign="center">
          会場の臨場感を画面上でも！
        </Heading>
        <Button
          mb={8}
          size="lg"
          target="_blank"
          colorPalette="red"
          width="100%"
          variant="outline"
          onClick={subscribe}
        //href="https://buy.stripe.com/test_9B628seei0Ci5nx46H4ow0d"
        >
          今すぐ申し込む　（初月無料！）
        </Button>

        <Separator mb={8} />

        <Heading as="h3" size="2xl" mb={8}>
          オンラインコミュニティについて
        </Heading>

        <AspectRatio maxW={400} ratio={9 / 16} my={8} mx="auto">
          <iframe
            src="https://file.notion.so/f/f/beeff5d9-602b-463c-8dee-35d6b9e6c363/a93397a5-dced-4ee6-9447-a14d0c4f2420/circle.mp4?table=block&id=2dde7ef4-828e-8043-94fa-ffa43df1afaa&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&expirationTimestamp=1767463200000&signature=fBV1CkCXS3zuvLj4gQfVe2LO0vv0ATA7_CQuGw7QjP8"
            allowFullScreen
          />
        </AspectRatio>

        <Text mb={8}>
          このオンラインコミュニティは、安心感の中で<span className='highlight'>心と身体をひらき、ポテンシャルを開花させ、本来の自分に目覚めること</span>を目的とした場です。
        </Text>

        <Text mb={8}>
          ただ踊るだけではなく、感情の解放、エネルギーの循環、習慣づくりを通して、本来の自分を目覚めさせるプロセスを大切にしています。
        </Text>

        <Text mb={8}>
          月２回のオンラインクラスとエクスタティックダンスを通して、踊りの感覚を「一時的な体験」で終わらせず、日常や生き方へと活かしていきます。
        </Text>

        <Text mb={8}>
          エクスタティックダンス東京主宰・ファシリテーター EMI の海外で得た叡智や経験をベースに、<span className='highlight'>身体を癒しと変容のツール</span>として使う感覚を育み、セルフケア、ジャーナリング、エシカル情報などをシェアしながら、心と身体の両方を整えていく<span className='highlight'>実践型・体感型のコミュニティ</span>です。
        </Text>

        <List.Root mb={8} variant="plain">
          <List.Item>「もっと深く身体と繋がりたい」</List.Item>
          <List.Item>「本質を思い出したい」</List.Item>
          <List.Item>「軽やかに生きたい」</List.Item>
          <List.Item>「将来ファシリテーターとして活動したい」</List.Item>
          <List.Item>「コミュニティの一員として繋がりを深めたい」</List.Item>
        </List.Root>

        <Text mb={8}>そう感じる方のための、継続的に学び、成長し、高め合うオンラインコミュニティです。</Text>

        <Flex justifyContent="space-between" gap={4} mb={8}>
          <Image maxH={400} src="https://principled-ethernet-41a.notion.site/image/attachment%3A1f50b82e-0654-4d36-86e7-d044e153fd4c%3A207891_0.jpg?table=block&id=2d6e7ef4-828e-8050-931e-e022543943a1&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=580&userId=&cache=v2" />
          <Image maxH={400} src="https://principled-ethernet-41a.notion.site/image/attachment%3A4f4b3953-8416-4a16-a826-b414d01713e5%3A194386_0.jpg?table=block&id=2d6e7ef4-828e-8044-bff0-e133088bedb0&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=580&userId=&cache=v2" />
        </Flex>

        <Heading as="h3" size="2xl" mb={8}>継続することで何が起こる？</Heading>

        <Text mb={8}>
          身体の内側で何が起きているのかを感じる力を育み、それを動きとして外側に表現していくプロセスは、浄化・ヒーリング・変容そのもの。
        </Text>

        <Text mb={8}>
          本来の自分を目覚めさせるためには、**回路を開き、育て続けることが鍵。<br />
          オンラインでの継続は、その状態を「一度限りの特別体験」に終わらすことなく、**何度も思い出しながら当たり前の状態へと定着させるための場です。
        </Text>

        <Text mb={8}>
          ここで発信する内容を継続していくことで、眠っていたエネルギーが流れ始め、<span className='highlight'>ボディーマインド、エネルギーレベルでのシフト</span>を体感できるようになります。
        </Text>

        <Text mb={8}>
          それらを日常生活に落とし込み体現していくことで、ダンスの質だけでなく、<span className='highlight'>在り方、生き方、人との関わり方までも変わり、自然と物事がスムーズに運ばれる</span>ように。
        </Text>

        <Separator mb={8} />

        <Heading as="h3" size="2xl" mb={8}>コミュニティーに参加するメリット</Heading>

        <List.Root mb={8}>
          <List.Item>場所を選ばずご自分のペースで参加、継続できる</List.Item>
          <List.Item>一人では続かないことも、自然に継続できる</List.Item>
          <List.Item>コミュニティとしての共同体意識が深まる</List.Item>
          <List.Item>普段出せない所も自分の安心安全の空間で解放できる</List.Item>
          <List.Item>孤独感を感じることなく仲間と一緒に成長できる安心感</List.Item>
          <List.Item>グループクラス→エクスタティックダンスの流れで着実な変化がでやすい</List.Item>
          <List.Item>踊りが特別な体験から在り方の変化へ</List.Item>
          <List.Item>海外のエクスタティックダンスDJやファシリテーターとの繋がれるチャンス</List.Item>
          <List.Item>ボーナス特典をゲットできる</List.Item>
        </List.Root>

        <Image
          mb={8}
          mx="auto"
          maxH={400}
          src="https://principled-ethernet-41a.notion.site/image/attachment%3A4382014d-e1e4-4771-b5d7-dc1e54cf7556%3AS__105234446_0.jpg?table=block&id=2dde7ef4-828e-809d-ac44-c453ae0a5e3c&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=580&userId=&cache=v2"
        />

        <Separator mb={8} />

        <Heading as="h3" size="2xl">オンラインダンスの内容</Heading>
        <Text>毎月２回</Text>

        <List.Root mb={8}>

          <List.Item mb={8}>エクスタティックダンス９０－１２０分
            <List.Root variant="plain">
              <List.Item>①オープニング</List.Item>
              <List.Item>②ムーブメントウオームアップ（誘導つき）</List.Item>
              <List.Item>③エクスタティックダンス</List.Item>
              <List.Item>④インテグレーション（誘導つき）</List.Item>
              <List.Item>⑤シェアタイム</List.Item>
              <List.Item>※現場と似た体験をオンラインでも！</List.Item>
              <List.Item>※滞ったエネルギーを循環させるのに最適</List.Item>
            </List.Root>
          </List.Item>

          <List.Item>テーマ別クラス６０分（5-10分のシェアタイム含む）
            <List.Root variant="plain">
              <List.Item>【毎月テーマ別】※感覚的に踊るステップを分かりやすく教えていきます</List.Item>
            </List.Root>
          </List.Item>

          <List.Root variant="plain">
            <List.Item>「踊るためのコツが知りたい」</List.Item>
            <List.Item>「しなやかな身体作りや動きをしたい」</List.Item>
            <List.Item>「感覚的に踊って表現してみたい」</List.Item>
          </List.Root>
        </List.Root>

        <Text mb={8}>
          そんな方のために、１月～１２月までテーマに沿って身体の基盤をしっかり整え、最終的に感覚的に踊れるまで心と身体を開いていきます✨
        </Text>

        <Text className='highlight'>☝️おススメの流れ</Text>

        <Text mb={8}>
          毎月グループクラスで動きを腑に落としたあと、エクスタティックダンスで唯一無二のダンススタイルを表現する場として活かすことも
        </Text>

        <Image
          mb={8}
          mx="auto"
          maxWidth={400}
          src="https://principled-ethernet-41a.notion.site/image/attachment%3A3e9b59a6-bd4e-43b0-b23f-57b5fdd599e3%3A207884_0.jpg?table=block&id=2dde7ef4-828e-8049-81d0-ca3eedfac84d&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=860&userId=&cache=v2"
        />

        <Separator mb={8} />

        <Heading as="h3" size="2xl">こんな方へ</Heading>

        <List.Root mb={8}>
          <List.Item>心身を整える術を身につけたい</List.Item>
          <List.Item>頭で考えすぎる癖を手放したい</List.Item>
          <List.Item>感情を身体にため込まずに上手に循環させたい</List.Item>
          <List.Item>自分軸を取り戻し自由に生きたい</List.Item>
          <List.Item>自己表現が苦手で自信を持ちたい</List.Item>
          <List.Item>踊りをセラピーのツールとして使ってみたい</List.Item>
          <List.Item>自己探求に興味はあるけど難しい理論は苦手と感じる</List.Item>
          <List.Item>同じ意識の仲間と繋がりたい</List.Item>
          <List.Item>定期的にメインテナンスしたい</List.Item>
          <List.Item className="highlight">ファシリテーターやムーブメントファシリテーターとして今後活動したい（エクスタティックダンス東京で活躍できるサポート有）</List.Item>
        </List.Root>

        <Image
          mb={8}
          src="https://principled-ethernet-41a.notion.site/image/attachment%3A89420e1a-0361-429c-9a09-5b4ff10e1dbe%3A207886_0.jpg?table=block&id=2c3e7ef4-828e-80f5-8be4-c2ecd5ed641a&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=1420&userId=&cache=v2"
        />

        <Separator mb={8} />

        <Heading as="h3" size="2xl">期待できる変化</Heading>

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
          src="https://principled-ethernet-41a.notion.site/image/attachment%3Af3beea9a-c8ab-4d69-a98c-ec73ba60b616%3A207885_0.jpg?table=block&id=2d6e7ef4-828e-80ab-85d5-e8503e6aa4e0&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=1340&userId=&cache=v2"
        />

        <Separator mb={8} />

        <Heading as="h3" size="2xl">含まれる内容</Heading>

        <Text>月額プラン</Text>

        <List.Root>
          <List.Item>【毎月】６０分のグループクラス（第２金曜20:30-21:30）</List.Item>
          <List.Item>【毎月】１２０分のオンライン上のエクスタティックダンス（第４日曜20:30-22:30）</List.Item>
        </List.Root>
        <Text className='highlight' mt="1em">✧特典✧</Text>
        <List.Root mb={8}>
          <List.Item>【毎月】５分のミニコンテンツ配信 ⇨ 即実践できる！<span className="highlight">ソマティックセルフケア</span> （身体に還り心をケアする方法）の紹介</List.Item>
          <List.Item>（身体に還り心をケアする方法）の紹介</List.Item>

          <List.Root variant="plain">
            <List.Item>「落ち込んでる時にアガル！」等のヒントつき</List.Item>
          </List.Root>

          <List.Item>【毎月】月のテーマに沿ったメッセージ投稿</List.Item>
          <List.Item>【不定期】お茶会with EMI ⇨ リラックスしながら胸の内を語り合う交流とサポートの場</List.Item>
          <List.Item>【不定期】海外のエクスタティックダンスファシリテーターやDJとのゲストLIVE配信</List.Item>
          <List.Item>【不定期】エシカル生活役立ち情報 ⇨ ナチュラルレメディー、アロマ/スパセラピストのバックグラウンドを活かした健康と環境に役立つヒントを発信</List.Item>
          <List.Item>ワークショップ、プログラムを<span className='highlight'>メンバー限定価格</span>で参加・受講可能</List.Item>
          <List.Item className='highlight'>海外リトリート先行案内＆割引</List.Item>
          <List.Item>
            <span className='highlight'>EMIとの個別セッションの優先受付</span>
            <List.Root variant="plain">
              <List.Item>【1:1レッスン・セッション】プライベートレッスン、生まれ持った使命を読み解くセッション</List.Item>
              <List.Item>【1:1コーチング】エクスタティックダンスコミュニティを始めたい、ファシリテーター/ムーブメントファシリテーターとして活動したい方への直接指導</List.Item>
            </List.Root>
          </List.Item>
        </List.Root>

        <Separator my={8} />

        <Heading as="h3" size="2xl">開催日時</Heading>
        <Text>〇グループクラス　毎月第２日曜日　20:30-21:30</Text>
        <Text>〇エクスタティックダンス　毎月第４金曜日　20:30-22:30</Text>
        <Text>※３０日間アーカイブあり</Text>

        <Separator my={8} />

        <Heading as="h3" size="2xl">
          月額費
        </Heading>

        <List.Root mb={8}>
          <List.Item>月3300円</List.Item>

          <List.Root variant="plain" mb={8}>
            <List.Item><span className='highlight'>⇨<Link href="https://buy.stripe.com/test_9B628seei0Ci5nx46H4ow0d" target='_blank'>申し込む</Link></span>（2/1までのお申込みで初月無料）</List.Item>
            <List.Item>「落ち込んでる時にアガル！」等のヒントつき</List.Item>
          </List.Root>

          <List.Item>
            年会費33,000円（2か月分お得）
            <List.Root variant="plain">
              <List.Item>※2026/2/1~2027/1/31まで</List.Item>
              <List.Item className='highlight'>⇨申し込む</List.Item>
            </List.Root>
          </List.Item>
        </List.Root>

        <Separator my={8} />

        <Heading as="h3" size="2xl">
          当日の流れ
        </Heading>

        <List.Root as="ol" mb={8}>
          <List.Item>リンクをクリックし、入室する（５分前から〇）</List.Item>
          <List.Item>ウェルカム＆オープニング</List.Item>
          <List.Item>ウオームアップ＋エクスタティックダンスまたはムーブメントクラス</List.Item>
          <List.Item>シェアタイム</List.Item>
          <List.Item>終了</List.Item>
        </List.Root>

        <Separator my={8} />

        <Heading as="h3" size="2xl">
          準備いただくもの
        </Heading>

        <List.Root mb={8}>
          <List.Item>パソコンかスマホ</List.Item>
          <List.Item>
            フェイスブックアカウント
            <List.Root variant="plain">
              <List.Item>アカウントがない方はお手数ですが開設願います（プライベートグループご招待のため）</List.Item>
            </List.Root>
          </List.Item>
          <List.Item>動きやすい服</List.Item>
          <List.Item>身体を動かせるスペース</List.Item>
        </List.Root>

        <Separator my={8} />

        <Heading as="h3" size="2xl">
          入会日
        </Heading>

        <List.Root variant="plain" mb={8}>
          <List.Item>いつでも入会いただけます</List.Item>
          <List.Item>但し、月ごと投稿になるのでフェイスブックグループへの承認は毎月１日です</List.Item>
          <List.Item>※ミニコンテンツやクラスのアーカイブは毎月１日から月末までの１か月間のこります</List.Item>
          <List.Item>※最低３ヵ月間の入会をお願いしています</List.Item>
        </List.Root>

        <Separator my={8} />

        <Heading as="h3" size="2xl">
          参加方法
        </Heading>

        <List.Root as="ol" mb={8}>
          <List.Item>参加申し込みをする</List.Item>
          <List.Item>決済完了（自動でFACEBOOKグループ招待リンクが表示されます）</List.Item>
          <List.Item>決済後にフェイスブックのプライベートグループへの申請（アカウントがない方は開設をお願いします）</List.Item>
          <List.Item>プライベートグループ内にある投稿やリンクを確認</List.Item>
          <List.Item>当日になったらリンクに飛び参加♪</List.Item>
        </List.Root>

        <Separator my={8} />

        <List.Root variant="plain" mb={8}>
          <List.Item className='highlight'>
            <List.Indicator>👉</List.Indicator>
            <Link href="https://buy.stripe.com/test_9B628seei0Ci5nx46H4ow0d" target='_blank'>月額メンバーシップお申込みの方はこちら</Link>
          </List.Item>
          <List.Item className='highlight'>
            <List.Indicator>👉</List.Indicator>
            一括年会費お申込みの方はこちら
          </List.Item>
        </List.Root>

        <Separator my={8} />

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

        <Text><Link href="mailto:facilitatoremi@gmail.com">✉ facilitatoremi@gmail.com</Link></Text>
        <Text><Link href="mailto:ecstaticdancetokyo@gmail.com">✉ ecstaticdancetokyo@gmail.com</Link></Text>

        <Separator mb={8} />

        <Heading as="h3" size="2xl" mb={8}>
          ファシリテーター
        </Heading>

        <Image
          mx="auto"
          maxW={400}
          mb={8}
          src="https://principled-ethernet-41a.notion.site/image/attachment%3A04a34a27-3e4b-4e26-b8ed-84f005b456bd%3Ab2c933b6-75a9-4734-9f73-a20bbd883346.png?table=block&id=2cae7ef4-828e-802d-903d-d58bd93a09c9&spaceId=beeff5d9-602b-463c-8dee-35d6b9e6c363&width=860&userId=&cache=v2"
        />

        <Heading as="h4" size="xl" mb={4} textTransform="uppercase" fontStyle='italic' fontWeight="bold">
          Emi Tanaka
        </Heading>

        <Text mb={8}>エクスタティックダンス東京主宰<br />
          ムーブメントファシリテーター・スペースホルダー・セラピスト</Text>

        <Text mb={8}>1984年、オランダ生まれニューヨーク育ちの帰国子女。<br />
          幼い頃から型にはまるのが苦手で、ルールや皆と同じである事に違和感を感じながら過ごす。<br />
          ２０代で発覚した甲状腺の病気をきっかけに心と身体を整えるように。</Text>

        <Text>2019年、バリ島でエクスタティックダンスと出会い、その時味わった衝撃と解放感により<br />
          自身の本質が開花したことをきっかけに、エクスタティックダンス東京を立ち上げる。</Text>

        <Text mb={8}>身体をツールとし変容を促し本来の自分へと還るためのムーブメントファシリテーション<br />
          を国内外で指導。</Text>

        <Text mb={8}>ボディーワーク、プラントメディスン、エネルギーワーク、マインドセットコーチング、ファシリテーション等を総合的に学んでいる。<br />
          心身を解放し可能性を目覚めさせ、自分らしい人生を切り開くためのサポートやセッション、ワークショップやイベントを開催している。</Text>

        <Text mb={8}>現在は東京とポルトガルを拠点に活動し、日本とポルトガルの架け橋となるようなプロジェクトを始動。</Text>

        <Separator mb={8} />

      </Container>
    </Provider>
  );
}

export default App;
